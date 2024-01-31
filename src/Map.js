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
import { colors } from "./constants/colors";

const Map = () => {
  const navigate = useNavigate();
  const markers = [
    { name: "Port of Rotterdam", lat: 51.9225, lng: 4.47917 },
    { name: "Port of Singapore", lat: 1.29443, lng: 103.85654 },
    { name: "Port of Shanghai", lat: 31.23333, lng: 121.47806 },
    { name: "Port of Hong Kong", lat: 22.39643, lng: 114.1095 },
    { name: "Port of Los Angeles", lat: 33.7525, lng: -118.25 },
    { name: "Port of Dubai", lat: 25.276987, lng: 55.296249 },

    // Additional coordinates
    { name: "New York City, USA", lat: 40.7128, lng: -74.006 },
    { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Mumbai, India", lat: 19.076, lng: 72.8777 },
    { name: "Cape Town, South Africa", lat: -33.918, lng: 18.4233 },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729 },
    { name: "Seoul, South Korea", lat: 37.5665, lng: 126.978 },
    { name: "Vancouver, Canada", lat: 49.2827, lng: -123.1207 },
    // ... (add 91 more coordinates as needed)
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor:colors?.whiteSmoke}}>
        <Toolbar>
          {/* <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon color="primary"/>
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={colors?.black}
            onClick={() => navigate(`/`)}
          >
            {`Supply Management System`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 3,mt:"40px" }}>
        <div>
          <h1>Orders on Google Map</h1>
          <MapWithMarkers markers={markers} />
        </div>
      </Box>
    </Box>
  );
};

export default Map;
