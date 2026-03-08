from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    full_name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = "tourist" # Default role

class SOSSchema(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    message: str = "Emergency! Help needed."

class FeedbackSchema(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    incident_type: str  # e.g., "Theft", "Poor Lighting"
    severity: int       # 1 to 5
    description: str