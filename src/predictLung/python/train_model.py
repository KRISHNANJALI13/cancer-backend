import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report

# Load CSV file
df = pd.read_csv("lung_cancer_data.csv")  # Ensure this path is correct

# Encode categorical values (if applicable)
label_encoder = LabelEncoder()
df['gender'] = label_encoder.fit_transform(df['gender'])
df['level'] = label_encoder.fit_transform(df['level'])

# Select features and target
FEATURES = ["air_pollution", "dust_allergy", "occupational_hazards", "genetics", 
            "chronic_lung", "obesity", "smoking", "passive_smoker", "chest_pain", 
            "coughing_of_blood", "weight_loss", "wheezing", "frequent_cold", 
            "dry_cough", "snoring"]
TARGET = "level"

X = df[FEATURES]
y = df[TARGET]

# Split dataset into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Random Forest model
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Evaluate model performance
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save the trained model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved successfully!")
