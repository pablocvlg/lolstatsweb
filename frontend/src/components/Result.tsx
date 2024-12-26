import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface ResultProps {
  summonerLevel: number | null;
  profileIconUrl: string | null;
}

const Result: React.FC<ResultProps> = ({ summonerLevel, profileIconUrl }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 3,
      }}
    >
      {summonerLevel !== null && (
        <Typography variant="h6">Summoner Level: {summonerLevel}</Typography>
      )}
      {profileIconUrl && (
        <Avatar
          alt="Summoner Icon"
          src={profileIconUrl}
          sx={{ margin: "20px auto", width: 100, height: 100 }}
        />
      )}
    </Box>
  );
};

export default Result;
