def process_site_input(data):

    required_fields = [
    "pincode",
    "location_type",
    "distance_km",
    "terrain_type",
    "infra_type",
    "base_material_cost",
    "labor_rate_factor"
]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"{field} is missing")

    if data["distance_km"] <= 0:
        raise ValueError("Distance must be positive")

    return data