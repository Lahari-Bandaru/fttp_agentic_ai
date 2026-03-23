def apply_risk_adjustment(cost, terrain_type):

    risk_map = {
        "Low": 1.0,
        "Medium": 1.08,
        "High": 1.15
    }

    multiplier = risk_map.get(terrain_type, 1.0)

    final_cost = cost * multiplier

    return final_cost, multiplier