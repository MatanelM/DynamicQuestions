import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const primaryColor = "#1589e3"; // Defining a primary color


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  color: primaryColor,
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down("sm")]: {
    borderBottom: "none"
  },
}));

const TopBar = ({ title }) => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" component="div" align="center">
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;