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
    
    try {
      // Obtain summoner's puuid
      const response = await fetch(puuidUrl);
      
      if (response.ok) {
        // Save puuid and build the url to obtain the summoner's details
        const data = await response.json();
        const puuid = data.puuid;
        const summonerDetailsUrl = `http://localhost:8000/profile-info/euw1/${puuid}`;
        // Obtain summoner's details
        const detailsResponse = await fetch(summonerDetailsUrl);

        if (detailsResponse.ok) {
          // Save summoner's details
          const detailsData = await detailsResponse.json();
          const summonerLevel = detailsData.summonerLevel;
          const profileIconUrl = `https://ddragon-webp.lolmath.net/latest/img/profileicon/${detailsData.profileIconId}.webp`;
          const matchHistoryUrl = `http://localhost:8000/matches/europe/${puuid}`;
          const matchHistoryResponse = await fetch(matchHistoryUrl);

          if (matchHistoryResponse.ok) {
            const matchHistoryData = await matchHistoryResponse.json();

            // Set loading progress to 30%
            setProgress(30);

            // Loop through the match history and fetch details for each match
            const matchDetailsPromises = matchHistoryData.map(async (matchId: string) => {
                try {
                    const matchDetailUrl = `http://localhost:8000/match/europe/${matchId}`;
                    const matchDetailResponse = await fetch(matchDetailUrl);

                    if (matchDetailResponse.ok) {
                        return await matchDetailResponse.json();
                    } else {
                        console.error(`Error fetching details for match ${matchId}`);
                        setLoading(false);
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching match details:", error);
                    setLoading(false);
                    return null;
                }
            });

            // Set loading progress to 80%
            setProgress(80);
    
            // Wait for all match details to be fetched
            const matchDetails = await Promise.all(matchDetailsPromises);

            // Set loading progress to 90%
            setProgress(90);

            // Combine all data into one variable
            const summonerInfo = {
            summonerLevel,
            profileIconUrl,
            matchDetails: matchDetails
            };

            // Set loading progress to 90%
            setProgress(95);

            // Store summoner's details in the session storage to retreive them later
            sessionStorage.setItem('summonerInfo', JSON.stringify(summonerInfo));
          }
          // Set loading progress to 100%
          setProgress(100);
          // Navigate to the summoner view page
          navigate(`/summoner/${encodeURIComponent(summonerName)}-${summonerTag}`);
        } else {
          // Obtained puuid but can't obtain summoner details
          setLoading(false);
          alert("Error fetching summoner details.");
        }
      } else {
        // Can't obtain puuid
        setLoading(false);
        alert("Error fetching PUUID.");
      }
    } catch (error) {
      // Other errors
      console.error("Error:", error);
      setLoading(false);
      alert("Error connecting to the server.");
    }
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
