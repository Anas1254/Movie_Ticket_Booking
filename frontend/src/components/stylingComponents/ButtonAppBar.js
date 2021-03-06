import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Menu,
	MenuItem,
	Typography,
	Button,
	Toolbar,
	Box,
	AppBar,
} from "@mui/material";
import { toast } from "react-toastify";
import { SearchBar } from "./SearchBar";

function ButtonAppBar() {
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userEmail");
		localStorage.removeItem("userName");
		localStorage.removeItem("isAdmin");
		setUserToken("");
		toast.success("Logout successfully");
	};

	useEffect(() => {
		setUserToken(
			localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
		);
		setIsAdmin(localStorage.getItem("isAdmin") === "true" ? true : false);
	}, [userToken, isAdmin]);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/">
							<span style={{ color: "#ffffff", textDecoration: "none" }}>
								Movies
							</span>
						</Link>
					</Typography>
					<SearchBar />
					{userToken && (
						<Button color="inherit">
							<Link to="/user/my-bookings">
								<span style={{ color: "#ffffff", textDecoration: "none" }}>
									My Bookings
								</span>
							</Link>
						</Button>
					)}
					{userToken ? (
						<Button color="inherit" onClick={logoutHandler}>
							<span style={{ color: "#ffffff", textDecoration: "none" }}>
								Logout
							</span>
						</Button>
					) : (
						<>
							<Button color="inherit">
								<Link to="/login">
									<span style={{ color: "#ffffff", textDecoration: "none" }}>
										Login
									</span>
								</Link>
							</Button>

							<Button variant="outlined">
								<Link to="/signup">
									<span style={{ color: "#ffffff", textDecoration: "none" }}>
										Sign Up
									</span>
								</Link>
							</Button>
						</>
					)}
					{userToken && isAdmin && (
						<div>
							<Button
								id="basic-button"
								color="inherit"
								aria-controls={open ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}
							>
								Dashboard
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
							>
								<MenuItem>
									<Link
										to="/admin/moviedata"
										style={{ textDecoration: "none" }}
									>
										Show All Movies
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="/admin/ongoingmoviedata"
										style={{ textDecoration: "none" }}
									>
										Show Movie Schedules
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="/admin/addMovieForm"
										style={{ textDecoration: "none" }}
									>
										Add Movie
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="/admin/addOngoingMovie"
										style={{ textDecoration: "none" }}
									>
										Add Ongoing Movie
									</Link>
								</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default ButtonAppBar;
