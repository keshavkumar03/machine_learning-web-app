#first create a fastapi app instance
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from model import prediction
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def app_description():
    return ("this a basic machine learning model using Logistic regression on IRIS dataset deployed using fast api")
@app.get("/")
async def root():
   return{'message':app_description()}

 

from pydantic import BaseModel
class IrisData(BaseModel):
	sepal_length: float
	sepal_width: float
	petal_length: float
	petal_width: float
     
     
@app.post("/predict/")
async def predict_species_api(iris_data: IrisData):
	species = prediction(iris_data.sepal_length, iris_data.sepal_width, iris_data.petal_length, iris_data.petal_width)
	return {"species": species}