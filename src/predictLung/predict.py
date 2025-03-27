import sys
import json
import numpy as np
import pandas as pd
import joblib
import os

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")

if not os.path.exists(model_path):
    print(json.dumps({"error": "Model file 'model.pkl' not found"}))
    sys.exit(1)

# Load the model
model = joblib.load(model_path)

# Define feature names based on dataset
FEATURE_NAMES = [
    "air_pollution", "dust_allergy", "occupational_hazards", "genetics",
    "chronic_lung", "obesity", "smoking", "passive_smoker", "chest_pain",
    "coughing_of_blood", "weight_loss", "wheezing", "frequent_cold",
    "dry_cough", "snoring"
]

# Class labels
CLASS_LABELS = ["Low", "Medium", "High"]

def predict_lung_cancer(input_json):
    """Predict lung cancer risk from JSON input."""
    try:
        # Parse JSON data
        data = json.loads(input_json)

        # Ensure all required features are present
        input_features = {feat: data.get(feat, 0) for feat in FEATURE_NAMES}

        # Convert to DataFrame (Fix for feature name mismatch)
        input_df = pd.DataFrame([input_features])

        # Get predicted probabilities
        probabilities = model.predict_proba(input_df)[0]

        # Format output as percentage
        result = {CLASS_LABELS[i]: f"{probabilities[i] * 100:.2f}%" for i in range(len(CLASS_LABELS))}

        # Print result as JSON (so NestJS can read it)
        print(json.dumps({"data": result}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

# Read JSON from stdin (used when called via NestJS)
if __name__ == "__main__":
    input_json = sys.stdin.read().strip()
    predict_lung_cancer(input_json)
