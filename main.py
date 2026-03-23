from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from schemas import CostRequest, CostResponse
from pipeline.main_pipeline import estimate_cost

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app = FastAPI(
#     title="FTTP Cost Estimation API",
#     description="Agentic AI system for FTTP deployment costing",
#     version="1.0"
# )

@app.get("/")
def home():
    return {"message":"FTTP Agentic AI API Running"}

@app.post("/estimate-cost", response_model=CostResponse)
def estimate_cost_api(request: CostRequest):

    site_data = request.dict()

    result = estimate_cost(site_data)

    return result