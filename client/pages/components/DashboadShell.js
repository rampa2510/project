import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

export default React.memo(function DashboadShell(props) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar
          open={props.isDrawerOpen}
          toggleDrawer={props.toggleDrawer}
          drawerWidth={props.drawerWidth}
        />
        <Drawer
          open={props.isDrawerOpen}
          toggleDrawer={props.toggleDrawer}
          drawerWidth={props.drawerWidth}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </>
  );
});
