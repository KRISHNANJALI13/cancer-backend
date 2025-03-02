import torch
import torchvision.transforms as transforms
from PIL import Image

# Load pre-trained model
try:
    model = torch.jit.load("sarcoma_model.pt")
    model.eval()
except FileNotFoundError:
    raise FileNotFoundError("❌ Model file 'sarcoma_model.pt' not found. Please train and save the model.")

# Image preprocessing function
def process_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)), 
        transforms.ToTensor(),
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0)  # Add batch dimension

# Predict survival rate
def predict_survival(image_path):
    try:
        image_tensor = process_image(image_path)

        with torch.no_grad():
            prediction = model(image_tensor)

        survival_rate = prediction.item() * 100  # Convert to percentage
        return round(survival_rate, 2)

    except Exception as e:
        return f"Error processing image: {str(e)}"
