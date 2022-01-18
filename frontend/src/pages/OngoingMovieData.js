import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Paper } from "@mui/material";
import axios from "axios";
import OngoingMovie from "../components/Admin/OngoingMovieTable";

const OngoingMovieData = () => {
	const [userToken, setUserToken] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function getMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/current/list?page=0&size=50`,
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		);
		if (values) {
			console.log(values);
			setMovieList(values.data.data);
		}
	}

	// useEffect is triggered automatically when a page is loaded
	useEffect(() => {
		setUserToken(
			localStorage.getItem("userToken")
				? localStorage.getItem("userToken")
				: navigate("/login")
		);
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, []);

	const paperStyle = { padding: "30px 20px", width: 1000, margin: "20px auto" };

	return (
		<Paper elevation={4} style={paperStyle}>
			<Grid container item alignContent="center" justifyContent="center">
				{isLoading ? (
					<CircularProgress />
				) : (
					<OngoingMovie movieList={movieList} />
				)}
			</Grid>
		</Paper>
	);
};

export default OngoingMovieData;
