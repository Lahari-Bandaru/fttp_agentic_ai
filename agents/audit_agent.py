def generate_explanation(ml_cost, multiplier, final_cost):

    explanation = f"""
    ML Predicted Cost: {round(ml_cost,2)}
    Terrain Multiplier Applied: {multiplier}
    Final Estimated Cost: {round(final_cost,2)}
    """

    return explanation