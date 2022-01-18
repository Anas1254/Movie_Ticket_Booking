import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const UserEmailRef = useRef();
	const UserPasswordRef = useRef();

	const loginHandler = async (email, password) => {
		let response;
		try {
			response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/login`,
				{ email: email, password: password },
				{
					validateStatus: function (status) {
						return status < 500;
					},
				}
			);

			console.log(response);

			if (response.data.statusCode === 200) {
				localStorage.setItem("userToken", response.data.data.token);
				localStorage.setItem("userEmail", response.data.data.user.email);
				localStorage.setItem("userName", response.data.data.user.name);
				localStorage.setItem("isAdmin", response.data.data.user.isAdmin);

				toast.info("Login Successfully");
				setTimeout(() => {
					navigate("/");
					window.location.reload();
				}, 6000);
			} else {
				toast.error("Login Failed");
			}
		} catch (error) {
			// console.log(response);
			toast.error("Server Error");
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
		<Paper elevation={4} style={paperStyle}>
			<Grid container alignItems="space-around" justifyContent="center">
				<Grid marginBottom="20px">
					<h2 style={headerStyle}>Login</h2>
				</Grid>
				<form onSubmit={submitHandler}>
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
						ref={UserPasswordRef}
						sx={{ marginBottom: "20px" }}
					/>

					<Button fullWidth type="submit" variant="contained" color="primary">
						Login
					</Button>
				</form>
				<ToastContainer />
			</Grid>
		</Paper>
	);
}

export default Login;
