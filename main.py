from fastapi import FastAPI, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import hashlib

# Import your database tools
from database import user_collection, sos_collection, feedback_collection, user_helper
from schemas import UserSchema, SOSSchema, FeedbackSchema

# 1. Initialize the App
app = FastAPI(title="TOURIST SAFETY")

# 2. Setup CORS (The Bridge to Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- HELPER FUNCTIONS ---
def create_digital_id(name: str, email: str):
    """Generates a secure hash using Name + Email (No passport needed)"""
    raw_data = f"{name}-{email}"
    return hashlib.sha256(raw_data.encode()).hexdigest()

# --- ROUTES ---

@app.get("/")
async def root():
    return {"message": "SafeWay Backend is Live!"}

# 1. USER REGISTRATION
@app.post("/register")
async def create_user(user: UserSchema = Body(...)):
    # Check if user already exists
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = jsonable_encoder(user)
    
    # Generate the Secure Blockchain Hash using the Full Name
    user_data["blockchain_id"] = create_digital_id(user.full_name, user.email)
    
    # Insert into MongoDB
    new_user = await user_collection.insert_one(user_data)
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})
    
    return {
        "status": "User Created", 
        "token": "safeway_temp_token_" + user_data["blockchain_id"][:10], # Temporary Token
        "user": user_helper(created_user),
        "blockchain_id": user_data["blockchain_id"]
    }

# 2. USER LOGIN
@app.post("/login")
async def login(credentials: dict = Body(...)):
    email = credentials.get("email")
    password = credentials.get("password")
    
    user = await user_collection.find_one({"email": email})
    
    if user and user["password"] == password:
        return {
            "token": "safeway_secure_token_123", 
            "user": user_helper(user)
        }
    
    raise HTTPException(status_code=401, detail="Invalid email or password")

# 3. TRIGGER SOS
@app.post("/sos")
async def trigger_sos(sos: SOSSchema = Body(...)):
    sos_data = jsonable_encoder(sos)
    await sos_collection.insert_one(sos_data)
    return {"status": "Alert Sent", "msg": "Authorities notified!"}

# 4. AI RISK PREDICTION
@app.get("/predict-risk")
async def get_risk(lat: float, lng: float, hour: int):
    risk_score = 0
    if hour >= 22 or hour <= 4: risk_score += 4
    
    proximity = 0.01 
    reports_cursor = feedback_collection.find({
        "latitude": {"$gte": lat - proximity, "$lte": lat + proximity},
        "longitude": {"$gte": lng - proximity, "$lte": lng + proximity}
    })
    
    nearby_reports = await reports_cursor.to_list(length=100)
    for report in nearby_reports:
        risk_score += 2 if report["severity"] >= 4 else 1

    level = "High" if risk_score >= 7 else "Medium" if risk_score >= 4 else "Low"
    
    return {
        "risk_level": level,
        "score": risk_score,
        "advice": "High risk area. Stay alert!" if level == "High" else "Safe to travel."
    }

# 5. AUTHORITY DASHBOARD
@app.get("/authority/alerts")
async def get_active_alerts():
    alerts = []
    cursor = sos_collection.find({})
    async for document in cursor:
        alerts.append({
            "id": str(document["_id"]),
            "user_id": document["user_id"],
            "lat": document["latitude"],
            "lng": document["longitude"],
            "message": document["message"]
        })
    return {"alerts": alerts}

    # --- SUBMIT COMMUNITY FEEDBACK ---
@app.post("/submit-feedback")
async def submit_feedback(feedback: FeedbackSchema = Body(...)):
    feedback_data = jsonable_encoder(feedback)
    # Insert the report into the cloud database
    new_report = await feedback_collection.insert_one(feedback_data)
    
    return {
        "status": "Success", 
        "message": "Report saved. You are helping other travelers stay safe!",
        "report_id": str(new_report.inserted_id)
    }

# --- FETCH ALL REPORTS FOR MAP ---
@app.get("/community/reports")
async def get_all_reports():
    reports = []
    cursor = feedback_collection.find({})
    async for document in cursor:
        reports.append({
            "id": str(document["_id"]),
            "lat": document["latitude"],
            "lng": document["longitude"],
            "type": "danger", # We map incidents to the 'danger' filter
            "label": document["incident_type"],
            "description": document["description"],
            "severity": document["severity"]
        })
    return reports