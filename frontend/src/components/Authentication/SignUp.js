import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function SignUp() {
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const UserNameRef = useRef();
	const UserEmailRef = useRef();
	const UserPasswordRef = useRef();
	const UserConfirmPasswordRef = useRef();

	const signupHandler = async (fullname, email, password) => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/register`,
			{ fullname: fullname, email: email, password: password },
			{
				validateStatus: function (status) {
					return status < 500;
				},
			}
		);

		if (response.data.statusCode === 200) {
			localStorage.setItem("userToken", response.data.data.token);
			localStorage.setItem("userEmail", email);
			localStorage.setItem("userName", fullname);
			localStorage.setItem("isAdmin", response.data.data.isAdmin);
			navigate("/");
			window.location.reload();
		} else {
			toast.error("Signup Failed please try again!");
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const fullname = UserNameRef.current.querySelector("input").value;
		const email = UserEmailRef.current.querySelector("input").value;
		const password = UserPasswordRef.current.querySelector("input").value;
		const confirmPassword =
			UserConfirmPasswordRef.current.querySelector("input").value;

		console.log(fullname, email, password, confirmPassword);

		if (password === confirmPassword) {
			signupHandler(fullname, email, password);
		} else {
			toast.error("Password and confirm password are not same!");
		}
	};

	return (
		<Paper elevation={4} style={paperStyle}>
			<Grid container alignItems="space-around" justifyContainer="center">
				<Grid
					marginBottom="20px"
					container
					alignItems="space-around"
					justifyContainer="center"
				>
					<h2 style={headerStyle}>SignUp</h2>
				</Grid>
				<form onSubmit={submitHandler}>
					<TextField
						fullWidth
						label="Name"
						placeholder="Enter your name"
						ref={UserNameRef}
						sx={{ marginBottom: "20px" }}
					/>
					<TextField
						fullWidth
						label="Email"
						placeholder="Enter your Email"
						ref={UserEmailRef}
						sx={{ marginBottom: "20px" }}
					/>

					<TextField
						fullWidth
						label="password"
						placeholder="set Password"
						type="password"
						ref={UserPasswordRef}
						sx={{ marginBottom: "20px" }}
					/>
					<TextField
						fullWidth
						label="confirm Password"
						placeholder="confirm Password"
						type="password"
						ref={UserConfirmPasswordRef}
						sx={{ marginBottom: "20px" }}
					/>

					<Button fullWidth type="submit" variant="contained" color="primary">
						submit
					</Button>
				</form>
				<ToastContainer />
			</Grid>
		</Paper>
	);
}

export default SignUp;
