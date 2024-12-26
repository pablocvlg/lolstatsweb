# ./venv contains the virtual environment. This ensures all dependencies are isolated inside this envionment and don't conflict with other projects or global dependencies
# To create the virtual environment:
python -m venv venv
pip install fastapi httpx python-dotenv uvicorn

# ./app/__init__.py
# This file marks the directory ./app as a Python package. This file CANNOT BE renamed or moved

# Command to start virtual environment
.\venv\Scripts\activate

# Command to start the application, must be used inside ./app
uvicorn main:app --reload