# Entry point for the server

# Import main class FastAPI, a framework to create APIs
from fastapi import FastAPI

# Import Middleware to allow communication between the APIs and the frontend
from fastapi.middleware.cors import CORSMiddleware

# Import the APIRouter from my routes file
from routes import router

# Create an instance of the FastAPI application
app = FastAPI()

# Include the router to enable routes
app.include_router(router)

# Allow all origins to interact with my API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)