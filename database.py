import motor.motor_asyncio

# Create a collection for community feedback
feedback_collection = database.get_collection("community_feedback")

# 1. Point to your MongoDB address
MONGO_DETAILS = "mongodb://localhost:27017"

# 2. Start the "Client" (the connection)
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# 3. Create/Select a database named 'safeway_db'
database = client.safeway_db

# 4. Create "Collections" (These are like folders for our data)
user_collection = database.get_collection("users_collection")
sos_collection = database.get_collection("sos_alerts_collection")

# Simple helper to turn MongoDB data into a Python Dictionary
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user["role"],
    }