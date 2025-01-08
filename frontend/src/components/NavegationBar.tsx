import React from "react";
import { Box, Typography } from "@mui/material";

interface NavBarProps {
  height: string;
}

const NavBar: React.FC<NavBarProps> = ({ height }) => {
  return (
    <nav
      style={{
        height,
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 25px 0px 25px",
        borderBottom: "1px solid black"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={20}
          color="white"
          sx={{ fontFamily: "MedievalSharp", fontWeight: 700 }}
        >
          NOSTALGIA
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          fontSize={15}
          color="white"
          sx={{ fontFamily: "MedievalSharp", marginRight: "15px" }}
        >
          Developed by:
        </Typography>
        <Typography
          fontSize={20}
          color="white"
          sx={{ fontFamily: "MedievalSharp", fontWeight: 700 }}
        >
          PEPI
        </Typography>
      </Box>
    </nav>
  );
};

export default NavBar;
