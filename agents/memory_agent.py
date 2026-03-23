import json
import os

MEMORY_FILE = "data/history.json"

def store_estimate(site_data, final_cost):

    record = {
        "input": site_data,
        "estimated_cost": final_cost
    }

    if not os.path.exists(MEMORY_FILE):
        with open(MEMORY_FILE, "w") as f:
            json.dump([], f)

    with open(MEMORY_FILE, "r") as f:
        history = json.load(f)

    history.append(record)

    with open(MEMORY_FILE, "w") as f:
        json.dump(history, f, indent=4)