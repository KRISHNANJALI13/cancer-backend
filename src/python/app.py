from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
from model import predict_survival

app = FastAPI()

# Ensure "uploads" directory exists
os.makedirs("uploads", exist_ok=True)

@app.post("/analyze-mri/")
async def analyze_mri(file: UploadFile = File(...)):
    try:
        # Save file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run model prediction
        survival_rate = predict_survival(file_path)

        return {"filename": file.filename, "survival_rate": f"{survival_rate}%"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing MRI: {str(e)}")
