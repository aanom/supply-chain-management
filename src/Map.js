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
    { name: "Port of Rotterdam", lat: 51.9225, lng: 4.47917 },
    { name: "Port of Singapore", lat: 1.29443, lng: 103.85654 },
    { name: "Port of Shanghai", lat: 31.23333, lng: 121.47806 },
    { name: "Port of Hong Kong", lat: 22.39643, lng: 114.1095 },
    { name: "Port of Los Angeles", lat: 33.7525, lng: -118.25 },
    { name: "Port of Dubai", lat: 25.276987, lng: 55.296249 },
    { name: "Port of Rotterdam", lat: 51.9225, lng: 4.47917 },

    // Add more ports as needed
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
