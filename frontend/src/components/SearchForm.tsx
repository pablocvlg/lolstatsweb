import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

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
        marginTop: "7vh",
        padding: 3,
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(244, 244, 244, 0.7)",
        display: "flex",
        flexDirection: "row",
        gap: 3,
      }}
    >
      <TextField
        label="Sumonner Name + #TAG"
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
          width: "100%",
          "& input": {
            padding: "13px", // Adjust padding for the input itself
          },
          "& .MuiInputLabel-root": {
            color: "rgba(0, 0, 0, 0.7)", // Darker label color (adjust the opacity or use solid colors)
            fontWeight: "bold", // Optional: Make label bold
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "rgba(0, 0, 0, 0.4)", // Make label fully opaque when focused
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Set background color
            WebkitTextFillColor: "black", // Text color
            transition: "background-color 5000s ease-in-out 0s", // Prevent flashing
          },
          "& .MuiFilledInput-root.Mui-focused:after": {
            borderBottom: "2px solid black", // Focused state line
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
            width: "35%",
            padding: "15px 10px 10px 18px",
            fontFamily: "MedievalSharp",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 7,
            "&:hover": {
              backgroundColor: "#8A4553"
            },
        }}
        >
        Search
        <KeyboardDoubleArrowRightIcon sx={{ marginLeft: 1, marginBottom: 0.4, fontSize: 20 }} />
      </Button>
    </Box>
  );
};

export default SearchForm;
