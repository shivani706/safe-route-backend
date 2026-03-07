from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from database import user_collection, sos_collection, feedback_collection, user_helper
from schemas import UserSchema, SOSSchema, FeedbackSchema
import hashlib

from fastapi.middleware.cors import CORSMiddleware

# ... (your existing app = FastAPI() code)

# Add this block right after app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"], # Allow all actions (POST, GET, etc.)
    allow_headers=["*"], # Allow all headers
)

app = FastAPI(title="SafeWay API")

@app.get("/")
async def root():
    return {"message": "SafeWay Backend is Live!"}

# --- 1. USER REGISTRATION ---
@app.post("/register")
async def create_user(user: UserSchema = Body(...)):
    user_data = jsonable_encoder(user)
    new_user = await user_collection.insert_one(user_data)
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})
    return {"status": "User Created", "data": user_helper(created_user)}

# --- 2. TRIGGER SOS ---
@app.post("/sos")
async def trigger_sos(sos: SOSSchema = Body(...)):
    sos_data = jsonable_encoder(sos)
    await sos_collection.insert_one(sos_data)
    return {"status": "Alert Sent", "msg": "Authorities notified!"}

# --- 3. SUBMIT COMMUNITY FEEDBACK ---
@app.post("/submit-feedback")
async def submit_feedback(feedback: FeedbackSchema = Body(...)):
    feedback_data = jsonable_encoder(feedback)
    await feedback_collection.insert_one(feedback_data)
    return {"status": "Success", "msg": "Report saved to help others."}

# --- 4. AI RISK PREDICTION (Based on Time + Feedback) ---
@app.get("/predict-risk")
async def get_risk(lat: float, lng: float, hour: int):
    # A. Time-based risk
    risk_score = 0
    if hour >= 22 or hour <= 4: risk_score += 4
    
    # B. Community-based risk (Looking within ~1km)
    proximity = 0.01 
    reports_cursor = feedback_collection.find({
        "latitude": {"$gte": lat - proximity, "$lte": lat + proximity},
        "longitude": {"$gte": lng - proximity, "$lte": lng + proximity}
    })
    
    nearby_reports = await reports_cursor.to_list(length=100)
    for report in nearby_reports:
        risk_score += 2 if report["severity"] >= 4 else 1

    # C. Decision Logic
    level = "High" if risk_score >= 7 else "Medium" if risk_score >= 4 else "Low"
    
    return {
        "risk_level": level,
        "score": risk_score,
        "nearby_reports": len(nearby_reports),
        "advice": "High risk area based on community reports." if level == "High" else "Safe to travel."
    }

   # Add this helper function inside main.py
def create_digital_id(passport_num: str, email: str):
    # Combines data and creates a SHA-256 fingerprint
    raw_data = f"{passport_num}-{email}"
    digital_id_hash = hashlib.sha256(raw_data.encode()).hexdigest()
    return digital_id_hash

@app.post("/register")
async def create_user(user: UserSchema = Body(...)):
    user_data = jsonable_encoder(user)
    
    # Generate the Secure Blockchain Hash
    user_data["blockchain_id"] = create_digital_id(user.passport_number, user.email)
    
    # Hide the raw passport number before saving (for privacy)
    user_data["passport_number"] = "****" 
    
    new_user = await user_collection.insert_one(user_data)
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})
    return {"status": "User Created", "blockchain_id": user_data["blockchain_id"]}

@app.put("/update-location/{email}")
async def update_location(email: str, lat: float, lng: float):
    # Find the user by email and update their lat/lng
    updated_user = await user_collection.update_one(
        {"email": email}, 
        {"$set": {"current_lat": lat, "current_lng": lng}}
    )
    
    if updated_user.modified_count == 1:
        return {"message": "Location updated in real-time"}
    return {"message": "User not found"}

    # --- AUTHORITY DASHBOARD: FETCH ALL ACTIVE ALERTS ---
@app.get("/authority/alerts")
async def get_active_alerts():
    alerts = []
    # We find all alerts in the database
    cursor = sos_collection.find({})
    async for document in cursor:
        alerts.append({
            "id": str(document["_id"]),
            "user_id": document["user_id"],
            "lat": document["latitude"],
            "lng": document["longitude"],
            "status": document.get("status", "Active"),
            "message": document["message"]
        })
    return {"alerts": alerts}