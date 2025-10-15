import React from "react";
import { Stack, Avatar } from "@mui/material";

const DailyGoal = () => {
  const dias = ["L", "M", "X", "J", "V", "S", "D"];
  const completados = [true, true, false, true, true, true, false];

  return (
    <Stack direction="row" justifyContent="center" spacing={3}>
      {dias.map((dia, i) => (
        <Avatar
          key={dia}
          sx={{
            bgcolor: completados[i] ? "#7a5cf2" : "#e0e0e0",
            width: 40,
            height: 40,
            fontSize: "0.9rem",
          }}
        >
          {dia}
        </Avatar>
      ))}
    </Stack>
  );
};

export default DailyGoal;
