from pydantic import BaseModel

class CostRequest(BaseModel):
    location_type: str
    distance_km: float
    terrain_type: str
    infra_type: str
    base_material_cost: float = 5000
    labor_rate_factor: float = 1.2
    pincode: int


class CostResponse(BaseModel):
    estimated_cost: float
    risk_score: float
    explanation: str