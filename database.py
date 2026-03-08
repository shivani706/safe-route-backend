import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Use the environment variable, but fallback to local for development
# This allows the app to work on your laptop AND on Render.com
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = client.safeway_db

# 2. Define Collections
user_collection = database.get_collection("users_collection")
sos_collection = database.get_collection("sos_alerts_collection")
feedback_collection = database.get_collection("community_feedback")

# 3. Data Helper
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user.get("role", "tourist"), # Use .get to avoid errors if role is missing
        "blockchain_id": user.get("blockchain_id")
    }