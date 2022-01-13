import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import OngoingMovie from "../components/Admin/OngoingMovieTable";

const OngoingMovieData = () => {
	const [userToken, setUserToken] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function getMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/currrent/list?page=0&size=8`,
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
	}, [movieList]);

	return (
		<Grid container item alignContent="center" justifyContent="center">
			{isLoading ? (
				<CircularProgress />
			) : (
				<OngoingMovie movieList={movieList} />
			)}
		</Grid>
	);
};

export default OngoingMovieData;
