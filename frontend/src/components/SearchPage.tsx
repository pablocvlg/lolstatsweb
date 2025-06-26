import React, { useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import NavBar from "./NavegationBar";
import SearchForm from "./SearchForm";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  // Allows for route redirectioning
  const navigate = useNavigate();
  // Navigation bar height
  const navBarHeight = "5vh";
  // Loading state
  const [loading, setLoading] = useState(false);
  // Loading progress
  const [progress, setProgress] = useState(0);

  const handleSearch = async (summonerInfo: string) => {
    // Activate loading state
    setLoading(true);
    // Set loading progress to 0
    setProgress(0);
    // Separate the summoner name and the tag
    const [summonerName, summonerTag] = summonerInfo.split("#");
    // Build the url using the parameters introduced by the user
    const puuidUrl = `http://localhost:8000/puuid/europe/${summonerName}/${summonerTag}`;
    // Set loading progress to 10%
    setProgress(10);

    try {
      // Step 1: Obtain summoner's puuid
      const puuid = await getPuuid(puuidUrl);

      // If puuid is not obtained, stop the process
      if (!puuid) {
          setLoading(false);
          alert("Error fetching PUUID.");
          return;
      }

      // Set loading progress to 20%
      setProgress(20);

      // Step 2: Obtain summoner's profile details
      const profileDetails = await getProfileDetails(puuid);

      // Set loading progress to 30%
      setProgress(30);

      // Obtain summoner's entries
      const summonerEntries = await getSummonerEntries(puuid);

      // Set loading progress to 40%
      setProgress(40);

      // Step 3: Obtain match history
      const matchHistory = await getMatchHistory(puuid);

      // Set loading progress to 50%
      setProgress(50);

      // Step 4: Fetch match details
      const detailedMatchHistory = await getMatchDetails(matchHistory);

      // Set loading progress to 80%
      setProgress(80);

      // Step 5: Store the data in the session
      saveSummonerData(profileDetails, summonerEntries, detailedMatchHistory);

      // Set loading progress to 100%
      setProgress(100);

      // Navigate to the summoner view page
      navigate(`/summoner/${encodeURIComponent(summonerName)}-${summonerTag}`);

    } catch (error) {
        // Handle other errors
        console.error("Error:", error);
        setLoading(false);
        alert("Error connecting to the server.");
    }
  };

  // Function to get PUUID
  const getPuuid = async (puuidUrl: string) => {
    try {
        const response = await fetch(puuidUrl);
        if (response.ok) {
          const data = await response.json();
          return data.puuid;
        }
    } catch (error) {
        console.error("Error fetching PUUID:", error);
    }
    return null;
  };

  // Function to get profile details
  const getProfileDetails = async (puuid: string) => {
    const profileDetailsUrl = `http://localhost:8000/profile-info/euw1/${puuid}`;
    try {
        const response = await fetch(profileDetailsUrl);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error fetching profile details:", error);
    }
  };

  // Function to get summoner entries
  const getSummonerEntries = async (puuid: string) => {
    const profileDetailsUrl = `http://localhost:8000/entries/euw1/${puuid}`;
    try {
        const response = await fetch(profileDetailsUrl);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error fetching summoner entries:", error);
    }
  };

  // Function to get match history
  const getMatchHistory = async (puuid: string) => {
    const matchHistoryUrl = `http://localhost:8000/matches/europe/${puuid}`;
    try {
        const response = await fetch(matchHistoryUrl);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error fetching match history:", error);
    }
  };

  // Function to fetch match details
  const getMatchDetails = async (matchHistoryData: any) => {
    try {
        // Assuming match history is already fetched and passed
        const matchDetailPromises = matchHistoryData.map(async (matchId: string) => {
            try {
                const matchDetailUrl = `http://localhost:8000/match/europe/${matchId}`;
                const matchDetailResponse = await fetch(matchDetailUrl);
                if (matchDetailResponse.ok) {
                    return await matchDetailResponse.json();
                } else {
                    console.error(`Error fetching details for match ${matchId}`);
                    return null;
                }
            } catch (error) {
                console.error("Error fetching match history details:", error);
                return null;
            }
        });

        return await Promise.all(matchDetailPromises);
    } catch (error) {
        console.error("Error fetching match details:", error);
    }
  };

  // Function to save summoner data to session storage
  const saveSummonerData = async (profileDetails: any, summonerEntries: any, matchDetails: any) => {
    const summonerInfo = {
        profileDetails: profileDetails,
        summonerEntries: summonerEntries,
        matchDetails: matchDetails,
    };

    sessionStorage.setItem('summonerInfo', JSON.stringify(summonerInfo));
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }} >
        <NavBar height={navBarHeight} />
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ background: "url('gallery/background.jpg') no-repeat center center/cover", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "start" }}>
            <Typography paddingTop={"11vh"} fontSize={115} align="center" color="white" sx={{ fontFamily: "MedievalSharp", fontWeight: 700, textShadow: `
              -1px -1px 1px #000,  
              1px -1px 1px #000, 
              -1px 1px 1px #000, 
              1px 1px 1px #000 ` }}>NOSTALGIA</Typography>
                    {loading ? (
              // Muestra la barra de progreso mientras `loading` es true
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20vh" }}>
                <Typography fontSize={20} color="white" mb={2}>
                  Loading...
                </Typography>
                <Box sx={{ width: "50%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </Box>
            ) : (
              <SearchForm onSearch={handleSearch} />
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
