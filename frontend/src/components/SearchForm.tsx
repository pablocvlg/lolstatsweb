import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchFormProps {
  onSearch: (summonerName: string, summonerTag: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [summonerName, setSummonerName] = useState("");
  const [summonerTag, setSummonerTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summonerName || !summonerTag) {
      alert("Please enter both the summoner's name and tag.");
      return;
    }
    onSearch(summonerName, summonerTag);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 500,
        margin: "0 auto",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(244, 244, 244, 0.75)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Summoner Name"
        variant="outlined"
        fullWidth
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        sx={{marginTop: "10px"}}
      />
      <TextField
        label="Summoner Tag"
        variant="outlined"
        fullWidth
        value={summonerTag}
        onChange={(e) => setSummonerTag(e.target.value)}
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
