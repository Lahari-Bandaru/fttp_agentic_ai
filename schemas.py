from pydantic import BaseModel

class CostRequest(BaseModel):
    location_type: str
    distance_km: float
    terrain_type: str
    infra_type: str
    base_material_cost: float = 5000
    labor_rate_factor: float = 1.2
    pincode: int

from pydantic import BaseModel

class CostResponse(BaseModel):
    estimated_cost: float
    material_cost: float
    labor_cost: float
    distance_cost: float
    risk_adjustment: float
    risk_score: float
    explanation: str

















    
# class CostResponse(BaseModel):
#     estimated_cost: float
#     risk_score: float
#     explanation: str