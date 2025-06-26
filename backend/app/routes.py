# Define all the routes for the API

# <--IMPORTS-->

# Import APIRouter to allow for routes configuration, and an exception handler
from fastapi import APIRouter, HTTPException

# Import HTTP client to make requests to Riot's API
import httpx

# Libraries to import variables from the .env file
from dotenv import load_dotenv
import os

# <--ROUTER-->

# Create a router instance
router = APIRouter()

# <--API_KEY-->

# Load .env variables
load_dotenv()

# Obtain API-Key
API_KEY = os.getenv("RIOT_API_KEY")

# <--ROUTES-->

# Route to check if the API is working
@router.get("/")
def api_status():
    # Return a Python dictionary indicating that the API is working
    # FastAPI converts this dictionary to a JSON file before sending the response to the client
    return {
        "message": "The API is working."
    }

# Route to get a summoner's Puuid using his in-game name and his tag
@router.get("/puuid/{region}/{summoner_name}/{summoner_tag}")
async def get_puuid_by_riot_id(region: str, summoner_name: str, summoner_tag: str):
    
    """
    Obtain a summoner's Puuid using his Riot ID

    - region: Summoner's region (e.g., "europe", "americas").
    - summoner_name: Summoner's in-game name (could have space or special characters)
    - summoner_tag: Summoner's in-game tag, 3-5 characters
    """

    # Make sure the parameters are properly introduced (I could make the front check all this)
    if not summoner_name.strip():
        raise HTTPException(
            status_code=400,
            detail="The summoner's name cannot be empty."
        )
    
    if not summoner_tag.strip() or len(summoner_tag) < 3 or len(summoner_tag) > 5: # THIS SHOULD BE HANDLED IN THE FRONT
        raise HTTPException(
            status_code=400,
            detail="The summoner's tag was not introduced correctly."
        )

    # Build Riot's API URL
    url = f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{summoner_tag}"

    # Configure headers with Riot's API Key
    headers = {
        "X-Riot-Token": API_KEY
    }

    # Make HTTP request to Riot's API
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    # Handle errors
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error: {response.json().get('status', {}).get('message', 'Unknown error')}"
        )

    # Retornar los datos obtenidos como JSON
    return response.json()

# Route to get summoner's info (level and icon) using a puuid
@router.get("/profile-info/{region}/{puuid}")
async def get_level_and_icon_by_puuid(region: str, puuid: str):
    
    """
    Obtain summoner's info (level and icon) using his puuid

    - region: Summoner's region (e.g., "euw1", "eun1").
    - puuid: A summoner's ID (retrieved using his name and tag).
    """

    # Make sure the parameters are properly introduced (I could make the front check all this)
    if not puuid.strip():
        raise HTTPException(
            status_code=400,
            detail="The summoner's puuid cannot be empty."
        )

    # Build Riot's API URL
    url = f"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"

    # Configure headers with Riot's API Key
    headers = {
        "X-Riot-Token": API_KEY
    }

    # Make HTTP request to Riot's API
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    # Handle errors
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error: {response.json().get('status', {}).get('message', 'Unknown error')}"
        )

    # Retornar los datos obtenidos como JSON
    return response.json()

# Route to get a summoner's match history using a puuid
@router.get("/matches/{region}/{puuid}")
async def get_match_history_by_puuid(region: str, puuid: str):
    
    """
    Obtain a summoner's match history (matches' ids) using his puuid

    - region: Summoner's region (e.g., "europe", "americas").
    - puuid: A summoner's ID (retrieved using his name and tag).
    """

    # Make sure the parameters are properly introduced (I could make the front check all this)
    if not puuid.strip():
        raise HTTPException(
            status_code=400,
            detail="The summoner's puuid cannot be empty."
        )

    # Build Riot's API URL
    url = f"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"

    # Configure headers with Riot's API Key
    headers = {
        "X-Riot-Token": API_KEY
    }

    # Make HTTP request to Riot's API
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    # Handle errors
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error: {response.json().get('status', {}).get('message', 'Unknown error')}"
        )

    # Retornar los datos obtenidos como JSON
    return response.json()

# Route to get a match's details using its ID
@router.get("/match/{region}/{match_id}")
async def get_match_details(region: str, match_id: str):
    
    """
    Obtain a match's details using its ID

    - region: Summoner's region (e.g., "europe", "americas").
    - match_id: Match's ID
    """

    # Make sure the parameters are properly introduced (I could make the front check all this)
    if not match_id.strip():
        raise HTTPException(
            status_code=400,
            detail="The match's ID cannot be empty."
        )

    # Build Riot's API URL
    url = f"https://{region}.api.riotgames.com/lol/match/v5/matches/{match_id}"

    # Configure headers with Riot's API Key
    headers = {
        "X-Riot-Token": API_KEY
    }

    # Make HTTP request to Riot's API
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    # Handle errors
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error: {response.json().get('status', {}).get('message', 'Unknown error')}"
        )

    # Retornar los datos obtenidos como JSON
    return response.json()

# Route to get the entires for a summoner
@router.get("/entries/{region}/{puuid}")
async def get_summoner_entries(region: str, puuid: str):
    
    """
    Obtain a match's details using its ID

    - region: Summoner's region (e.g., "euw1", "na1").
    - puuid: A summoner's ID (retrieved using his name and tag).
    """

    # Make sure the parameters are properly introduced (I could make the front check all this)
    if not puuid.strip():
        raise HTTPException(
            status_code=400,
            detail="The summoner's encrypted ID cannot be empty."
        )

    # Build Riot's API URL
    url = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}"

    # Configure headers with Riot's API Key
    headers = {
        "X-Riot-Token": API_KEY
    }

    # Make HTTP request to Riot's API
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    # Handle errors
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Error: {response.json().get('status', {}).get('message', 'Unknown error')}"
        )

    # Retornar los datos obtenidos como JSON
    return response.json()