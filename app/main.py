# Entry point for the server

# Import main class FastAPI, a framework to create APIs
from fastapi import FastAPI

# Import the APIRouter from my routes file
from routes import router

# Create an instance of the FastAPI application
app = FastAPI()

# Include the router to enable routes
app.include_router(router)