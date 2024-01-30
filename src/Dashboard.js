import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { DataGrid } from "@mui/x-data-grid";
import data from "./data";

const { columns, rows, columnShipment } = data;
const drawerWidth = 240;

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
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [rowData, setRowData] = React.useState(rows);

  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = ["Orders", "Shipments"]; // Add your tab names here

  const handleConsolidateOrders = () => {
    if (window.confirm("Consolidate Orders")) {
      const groupedShipments = {};
      const shipments = [];
      // Iterate over the selected rows
      rowSelectionModel.forEach((selectedRowId) => {
        const selectedRow = rows.find(
          (row) => row.id === selectedRowId && row.STATUS === "UNPLANNED"
        );

        // Create a unique key based on destination, ETA, and mode of transport
        const key =
          `${selectedRow.Destination}-${selectedRow.ETA}-${selectedRow.Mode_of_Transport}-${selectedRow.Preferred_Carrier}`
            .replace(/\s/g, "")
            .toUpperCase();
        selectedRow.SHIPMENT_ID = key;
        selectedRow.STATUS = "PLANNED";
        shipments.push(selectedRow);
        // Check if the key exists in the groupedShipments object
        if (groupedShipments[key]) {
          // If it exists, add the selected row to the existing group
          groupedShipments[key].push(selectedRow);
        } else {
          // If it doesn't exist, create a new group with the selected row
          groupedShipments[key] = [selectedRow];
        }
      });

      // Log the grouped shipments
      // console.log(groupedShipments);
      // console.log(shipments);

      setRowData(shipments);
      alert("sucessfully consolidate check shipping");
    }

    //setSelectedTab(1);
  };

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredRows = rows.filter((item) =>
      String(item.id).includes(searchTerm)
    );

    setRowData(filteredRows);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {`Supply Management System`}
          </Typography>
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
                  backgroundColor:
                    selectedTab === index ? "#fff" : "transparent",
                  color: selectedTab === index ? "#000" : "#fff",
                }}
              />
            ))}
          </Tabs>
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
        {selectedTab === 0 && (
          <>
            <div style={{ marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search by SKU"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ padding: 8, width: 350 }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConsolidateOrders}
            >
              CONSOLIDATE MY ORDERS
            </Button>
            <DataGrid
              rows={rowData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[
                5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
              ]}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
            />
          </>
        )}
        {selectedTab === 1 && (
          <DataGrid
            rows={rowData.filter((item) => item.STATUS === "PLANNED")}
            columns={columnShipment}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[
              5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
            ]}
          />
        )}
      </Main>
    </Box>
  );
}
