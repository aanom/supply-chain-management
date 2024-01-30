import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Paper
      square
      elevation={3}
      style={{ textAlign: "center", padding: "10px" }}
    >
      <Typography variant="body2">&copy; 2023 Your Company</Typography>
    </Paper>
  );
};

export default Footer;
