import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchFormProps {
  onSearch: (summonerInfo: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [summonerInfo, setSummonerInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summonerInfo) {
      alert("Please enter both the summoner's name and tag.");
      return;
    }
    onSearch(summonerInfo);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 550,
        margin: "0 auto",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(244, 244, 244, 0.75)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <TextField
        label="SUMMONER NAME + #TAG"
        variant="filled"
        value={summonerInfo}
        onChange={(e) => setSummonerInfo(e.target.value)}
        slotProps={{
          inputLabel: {
            style: {
              visibility: summonerInfo ? "hidden" : "visible", // Hide label when there's text
            },
          },
        }}
        focused={summonerInfo.length > 0} // Make label stay in place instead of moving upwards
        sx={{
          marginTop: "10px",
          width: "100%",
          "& input": {
            padding: "13px", // Adjust padding for the input itself
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
            backgroundColor: "#c06918",
            color: "white",
            alignSelf: "center",
            width: "50%",
            padding: "10px",
            marginTop: "10px"
        }}
        >
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
