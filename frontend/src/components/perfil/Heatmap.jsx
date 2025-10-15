import React from "react";
import { Box } from "@mui/material";

const Heatmap = () => {
  const dias = Array.from({ length: 90 }, () => Math.floor(Math.random() * 4));
  const colores = ["#ede7f6", "#c5cae9", "#9fa8da", "#673ab7"];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(30, 12px)"
      gap="3px"
      justifyContent="center"
    >
      {dias.map((nivel, i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: "3px",
            backgroundColor: colores[nivel],
          }}
        />
      ))}
    </Box>
  );
};

export default Heatmap;
