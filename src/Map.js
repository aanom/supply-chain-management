import React from "react";

import { useNavigate } from "react-router-dom";
import MapWithMarkers from "./MapWithMarkers";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Map = () => {
  const navigate = useNavigate();
  const markers = [
    { id: 1, lat: -34.397, lng: 150.644 },
    { id: 2, lat: -35.297, lng: 149.122 },
    // Add more markers as needed
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate(`/`)}
          >
            {`Supply Management System`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <div>
          <h1>Orders on Google Map</h1>
          <MapWithMarkers markers={markers} />
        </div>
      </Box>
    </Box>
  );
};

export default Map;
