import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card"; // Add this import
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { colors } from "./constants/colors";

const drawerWidth = 240;
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor:colors?.whiteSmoke
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const CardBox = styled(Card)({
  margin: "10px",
  padding: "15px",
  textAlign: "center",
  borderRadius: "10px",
});

function Auction() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = ["Open Bids", "Closed Bids"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton> */}
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabs.map((text, index) => (
            <ListItem
              button
              key={text}
              selected={selectedTab === index}
              onClick={() => setSelectedTab(index)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          style={{ paddingLeft: 10 }}
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab}
              key={index}
              sx={{
                backgroundColor: selectedTab === index ? "#fff" : "#77B6EA",
                color: selectedTab === index ? "#77B6EA" : "#fff",
              }}
            />
          ))}
        </Tabs>
        {selectedTab === 0 && (
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <CardBox
              key={location.state.shipping.id}
              sx={{
                backgroundColor: getRandomColor(),
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h5">
                ID: {location.state.shipping.id}
              </Typography>
              <Typography variant="subtitle1">
                STATUS: {location.state.shipping.STATUS}
              </Typography>
              <Typography variant="subtitle1">
                Preferred Carrier: {location.state.shipping.Preferred_Carrier}
              </Typography>
              <Typography variant="subtitle1">
                Mode of Transport: {location.state.shipping.Mode_of_Transport}
              </Typography>
              <Typography variant="subtitle1">
                Estimate Time of Arrival : {location.state.shipping.ETA}
              </Typography>
              <Typography variant="subtitle1">
                Destination : {location.state.shipping.Destination}
              </Typography>
              <Typography variant="subtitle1">
                Assigned Carrier : {location.state.shipping.Assigned_Carrier}
              </Typography>
              <Link to={`/bidding-details/${location.state.shipping.id}`}>
                Join Bid
              </Link>
            </CardBox>
          </Box>
        )}
        {selectedTab === 1 &&
          location.state.rows.map((item) => {
            return (
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
              >
                <CardBox
                  key={item}
                  sx={{
                    backgroundColor: getRandomColor(),
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h5">ID: {item}</Typography>
                </CardBox>
              </Box>
            );
          })}
      </Main>
    </Box>
  );
}

export default Auction;
