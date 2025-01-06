import React from "react";
import { Box, Typography } from "@mui/material";

import SearchForm from "./SearchForm";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {

  // Allows for route redirectioning
  const navigate = useNavigate();

  const handleSearch = async (summonerInfo: string) => {
    
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

            // Loop through the match history and fetch details for each match
            const matchDetailsPromises = matchHistoryData.map(async (matchId: string) => {
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
                    console.error("Error fetching match details:", error);
                    return null;
                }
            });
    
            // Wait for all match details to be fetched
            const matchDetails = await Promise.all(matchDetailsPromises);

            // Combine all data into one variable
            const summonerInfo = {
            summonerLevel,
            profileIconUrl,
            matchDetails: matchDetails
            };

            // Store summoner's details in the session storage to retreive them later
            sessionStorage.setItem('summonerInfo', JSON.stringify(summonerInfo));
          }
          // Navigate to the summoner view page
          navigate(`/summoner/${encodeURIComponent(summonerName)}-${summonerTag}`);
        } else {
          // Obtained puuid but can't obtain summoner details
          alert("Error fetching summoner details.");
        }
      } else {
        // Can't obtain puuid
        alert("Error fetching PUUID.");
      }
    } catch (error) {
      // Other errors
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <>
      <Box sx={{ background: "url('gallery/background.jpg') no-repeat center center/cover", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography fontSize={110} align="center" color="white" sx={{ fontFamily: "MedievalSharp", fontWeight: 700 }}>NOSTALGIA</Typography>
        <SearchForm onSearch={handleSearch} />
      </Box>
    </>
  );
};

export default SearchPage;
