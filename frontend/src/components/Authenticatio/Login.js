import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: "5px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const UserNameRef = useRef();
  const UserEmailRef = useRef();
  const UserPasswordRef = useRef();
  const UserConfirmPasswordRef = useRef();

  const loginHandler = async (email, password) => {
    const response = await axios.post(
      "http://cb59-2405-201-2010-2834-21e5-7c21-4ca6-5586.ngrok.io/api/login",
      { email: email, password: password }
    );
    if (response.data.statusCode === 200) {
      localStorage.setItem("userToken", response.data.data.token);
      localStorage.setItem("userEmail", response.data.data.user.email);
      localStorage.setItem("userName", response.data.data.user.name);
      navigate("/");
    } else {
      alert("Login Failed please try agian!");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const email = UserEmailRef.current.querySelector("input").value;
    const password = UserPasswordRef.current.querySelector("input").value;

    console.log(email, password);
    // Validation

    loginHandler(email, password);
  };

  return (
    <Grid>
      <Paper elevation="10" style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Login</h2>
        </Grid>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your Email"
            ref={UserEmailRef}
          />

          <TextField
            fullWidth
            label="password"
            placeholder="set Password"
            ref={UserPasswordRef}
          />

          <Button fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;
