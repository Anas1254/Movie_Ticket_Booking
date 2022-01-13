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

function ButtonAppBar() {
	const [userToken, setUserToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userEmail");
		localStorage.removeItem("userName");
		localStorage.removeItem("isAdmin");
		setUserToken("");
	};

	useEffect(() => {
		setUserToken(
			localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
		);
		setIsAdmin(
			localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin") : false
		);
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
									<Link to="/admin/moviedata">Edit Movie</Link>
								</MenuItem>
								<MenuItem>
									<Link to="/admin/ongoingmoviedata">Edit Ongoing Movie</Link>
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
