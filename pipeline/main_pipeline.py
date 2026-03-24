# from agents.site_agent import process_site_input
# from agents.ml_agent import predict_cost
# from agents.risk_agent import apply_risk_adjustment
# from agents.audit_agent import generate_explanation
# from agents.memory_agent import store_estimate

# def estimate_cost(site_data):

#     # 1. Validate
#     data = process_site_input(site_data)

#     # 2. ML Prediction
#     ml_cost = predict_cost(data)

#     # 3. Risk Adjustment
#     final_cost, multiplier = apply_risk_adjustment(
#         ml_cost,
#         data["terrain_type"]
#     )

#     # 4. Explanation
#     explanation = generate_explanation(
#         ml_cost,
#         multiplier,
#         final_cost
#     )

#     # 5. Store in memory
#     store_estimate(data, final_cost)

#     return {
#         "estimated_cost": round(final_cost, 2),
#         "explanation": explanation
#     }


# if __name__ == "__main__":

#     sample_input = {
#     "pincode": 500081,
#     "location_type": "Urban",
#     "distance_km": 4.5,
#     "terrain_type": "High",
#     "infra_type": "Underground",
#     "base_material_cost": 6000,
#     "labor_rate_factor": 1.2
# }

#     result = estimate_cost(sample_input)
#     print(result)








# import joblib
# import pandas as pd

# # Load trained ML model
# model = joblib.load("Model/fttp_cost_model.pkl")


# def estimate_cost(site_data):

#     # Extract input features from request
#     location = site_data["location_type"]
#     distance = site_data["distance_km"]
#     terrain = site_data["terrain_type"]
#     infra = site_data["infra_type"]
#     base_cost = site_data["base_material_cost"]
#     labor = site_data["labor_rate_factor"]
#     pincode = site_data["pincode"]

#     # Create dataframe with column names (important for ColumnTransformer)
#     features = pd.DataFrame([{
#         "location_type": location,
#         "distance_km": distance,
#         "terrain_type": terrain,
#         "infra_type": infra,
#         "base_material_cost": base_cost,
#         "labor_rate_factor": labor,
#         "pincode": pincode
#     }])

#     # ML model prediction
#     predicted_cost = model.predict(features)[0]

#     # Simple risk calculation
#     risk_score = 0.1

#     if terrain == "High":
#         risk_score += 0.15

#     if infra == "Underground":
#         risk_score += 0.1

#     # Explanation message
#     explanation = "Cost calculated using terrain complexity, infrastructure type, and distance."

#     # Final response
#     return {
#         "estimated_cost": round(float(predicted_cost), 2),
#         "risk_score": round(risk_score, 2),
#         "explanation": explanation
#     }






import joblib
import pandas as pd
import json
import os

# Load trained ML model
model = joblib.load("Model/fttp_cost_model.pkl")


def estimate_cost(site_data):

    # =========================
    # Extract Input Features
    # =========================
    location = site_data["location_type"]
    distance = site_data["distance_km"]
    terrain = site_data["terrain_type"]
    infra = site_data["infra_type"]
    base_cost = site_data["base_material_cost"]
    labor = site_data["labor_rate_factor"]
    pincode = site_data["pincode"]

    # =========================
    # Create DataFrame (for ML model)
    # =========================
    features = pd.DataFrame([{
        "location_type": location,
        "distance_km": distance,
        "terrain_type": terrain,
        "infra_type": infra,
        "base_material_cost": base_cost,
        "labor_rate_factor": labor,
        "pincode": pincode
    }])

    # =========================
    # ML Prediction
    # =========================
    predicted_cost = model.predict(features)[0]

    # =========================
    # Risk Calculation
    # =========================
    risk_score = 0.1

    if terrain == "High":
        risk_score += 0.15

    if infra == "Underground":
        risk_score += 0.1

    # =========================
    # Cost Breakdown
    # =========================
    distance_cost = distance * 2000
    material_cost = base_cost
    labor_cost = labor * 1000
    risk_adjustment = predicted_cost * risk_score

    # =========================
    # Explanation
    # =========================
    explanation = "Cost calculated using terrain complexity, infrastructure type, and distance."

    # =========================
    # Save History (Audit Agent)
    # =========================
    history_file = "data/history.json"

    record = {
        "input": site_data,
        "estimated_cost": float(predicted_cost),
        "risk_score": risk_score
    }

    # Load existing history
    if os.path.exists(history_file):
        with open(history_file, "r") as f:
            history = json.load(f)
    else:
        history = []

    # Append new record
    history.append(record)

    # Save last 10 records only
    with open(history_file, "w") as f:
        json.dump(history[-10:], f, indent=2)

    # =========================
    # Final Response
    # =========================
    return {
        "estimated_cost": round(float(predicted_cost), 2),
        "material_cost": round(material_cost, 2),
        "labor_cost": round(labor_cost, 2),
        "distance_cost": round(distance_cost, 2),
        "risk_adjustment": round(risk_adjustment, 2),
        "risk_score": round(risk_score, 2),
        "explanation": explanation
    }