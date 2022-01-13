import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };
	const avatarStyle = { backgroundColor: "#1bbd7e" };

	const UserNameRef = useRef();
	const UserEmailRef = useRef();
	const UserPasswordRef = useRef();
	const UserConfirmPasswordRef = useRef();

	const signupHandler = async (fullname, email, password) => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/register`,
			{ fullname: fullname, email: email, password: password }
		);
		if (response.data.statusCode === 200) {
			localStorage.setItem("userToken", response.data.data.token);
			localStorage.setItem("userEmail", email);
			localStorage.setItem("userName", fullname);
			localStorage.setItem("isAdmin", response.data.data.user.isAdmin);
			navigate("/");
			window.location.reload();
		} else {
			alert("Signup Failed please try again!");
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
		// Validation

		if (password === confirmPassword) {
			signupHandler(fullname, email, password);
		} else {
			alert("Password and confirm password are not same!");
		}
	};

	return (
		<Grid>
			<Paper elevation="10" style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<AddCircleOutlineOutlinedIcon />
					</Avatar>
					<h2 style={headerStyle}>SignUp</h2>
					<Typography>
						please fill this form first to create an Account
					</Typography>
				</Grid>
				<form onSubmit={submitHandler}>
					<TextField
						fullWidth
						label="Name"
						placeholder="Enter your name"
						ref={UserNameRef}
					/>
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
					<TextField
						fullWidth
						label="confirm Password"
						placeholder="confirm Password"
						ref={UserConfirmPasswordRef}
					/>

					<Button fullWidth type="submit" variant="contained" color="primary">
						submit
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}

export default SignUp;
