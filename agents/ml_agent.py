import joblib
import pandas as pd

model = joblib.load("model/fttp_cost_model.pkl")

def predict_cost(site_data):

    df = pd.DataFrame([site_data])
    prediction = model.predict(df)

    return prediction[0]