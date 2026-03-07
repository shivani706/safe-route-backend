from pydantic import BaseModel, EmailStr, Field

# --- Existing User Rules ---
class UserSchema(BaseModel):
    full_name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = "tourist"

# --- Existing SOS Rules ---
class SOSSchema(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    message: str = "Emergency! Help needed."

# --- NEW: Add the Feedback Rules HERE ---
class FeedbackSchema(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    incident_type: str  # e.g., "Theft", "Poor Lighting", "Harassment"
    severity: int       # 1 (Low) to 5 (High)
    description: str

    # Add this to your UserSchema in schemas.py
class UserSchema(BaseModel):
    full_name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    passport_number: str = Field(...) # New field
    role: str = "tourist"