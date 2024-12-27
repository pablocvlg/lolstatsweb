import React from "react";
import { Box, Typography } from "@mui/material";

import SearchForm from "./SearchForm";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  
//   const [summonerLevel, setSummonerLevel] = useState<number | null>(null);
//   const [profileIconUrl, setProfileIconUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSearch = async (summonerName: string, summonerTag: string) => {
    // Build the url using the parameters introduced by the user
    const puuidUrl = `http://localhost:8000/puuid/europe/${summonerName}/${summonerTag}`;
    
    try {
      // Obtain summoner's puuid
      const response = await fetch(puuidUrl);
      
      if (response.ok) {
        // Save puuid and build the url to obtain the summoner's details
        const data = await response.json();
        const puuid = data.puuid;
        const summonerDetailsUrl = `http://localhost:8000/puuid/euw1/${puuid}`;
        // Obtain summoner's details
        const detailsResponse = await fetch(summonerDetailsUrl);

        if (detailsResponse.ok) {
          // Save summoner's details
          const detailsData = await detailsResponse.json();
          const summonerLevel = detailsData.summonerLevel;
          const profileIconUrl = `https://ddragon-webp.lolmath.net/latest/img/profileicon/${detailsData.profileIconId}.webp`;
        //   setProfileIconUrl(`https://ddragon-webp.lolmath.net/latest/img/profileicon/${detailsData.profileIconId}.webp`);
          const summonerInfo = { summonerLevel: summonerLevel, profileIconUrl: profileIconUrl };
          sessionStorage.setItem('summonerInfo', JSON.stringify(summonerInfo));
          console.log(summonerLevel);
          console.log(profileIconUrl);
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
      <Box sx={{ background: "url('gallery/background.jpg') no-repeat center center/cover", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography fontSize={100} align="center" color="white" gutterBottom sx={{ fontFamily: "MedievalSharp", fontWeight: 700 }}>NOSTALGIA</Typography>
        <SearchForm onSearch={handleSearch} />
      </Box>
    </>
  );
};

export default SearchPage;
