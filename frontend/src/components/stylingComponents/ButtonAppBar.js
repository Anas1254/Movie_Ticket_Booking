import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ButtonAppBar() {
  const [userToken, setUserToken] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserToken("");
  };

  useEffect(() => {
    setUserToken(
      localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
    );
  }, [userToken]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <span style={{ color: "#ffffff" }}>Movies</span>
            </Link>
          </Typography>
          {userToken ? (
            <Button color="inherit" onClick={logoutHandler}>
              <span style={{ color: "#ffffff" }}>Logout</span>
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button color="inherit">
                  <span style={{ color: "#ffffff" }}>Login</span>
                </Button>
              </Link>
              <Button variant="outlined">
                <Link to="/signup">
                  <span style={{ color: "#ffffff" }}>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
