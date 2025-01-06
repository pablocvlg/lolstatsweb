import React from "react";
import { Box, Typography } from "@mui/material";

interface NavBarProps {
  height: string; // Ejemplo: "60px" o "10vh"
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
        padding: "0 20px",
      }}
    >
      {/* Contenedor del Logo o Título */}
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

      {/* Contenedor del Desarrollador */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Coloca los elementos en fila
          alignItems: "center", // Centra horizontalmente
          textAlign: "center", // Alinea texto al centro
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
