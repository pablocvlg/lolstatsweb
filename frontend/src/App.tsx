import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Result from "./components/Result";
import { Box, Typography } from "@mui/material";

const App: React.FC = () => {
  const [summonerLevel, setSummonerLevel] = useState<number | null>(null);
  const [profileIconUrl, setProfileIconUrl] = useState<string | null>(null);

  const handleSearch = async (summonerName: string, summonerTag: string) => {
    const puuidUrl = `http://localhost:8000/puuid/europe/${summonerName}/${summonerTag}`;
    try {
      const response = await fetch(puuidUrl);
      if (response.ok) {
        const data = await response.json();
        const puuid = data.puuid;

        const summonerDetailsUrl = `http://localhost:8000/puuid/euw1/${puuid}`;
        const detailsResponse = await fetch(summonerDetailsUrl);
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          setSummonerLevel(detailsData.summonerLevel);
          setProfileIconUrl(
            `https://ddragon-webp.lolmath.net/latest/img/profileicon/${detailsData.profileIconId}.webp`
          );
        } else {
          alert("Error fetching summoner details.");
        }
      } else {
        alert("Error fetching PUUID.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <Box sx={{background: "url('gallery/background.jpg') no-repeat center center/cover", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Typography fontSize={100} align="center" color="white" gutterBottom sx={{fontFamily: "MedievalSharp", fontWeight: 700}}>NOSTALGIA</Typography>
      <SearchForm onSearch={handleSearch} />
      <Result summonerLevel={summonerLevel} profileIconUrl={profileIconUrl} />
    </Box>
  );
};

export default App;