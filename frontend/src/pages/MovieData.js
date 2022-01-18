import React, { useEffect, useState } from "react";
import { Paper, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import MoviesTable from "../components/Admin/MoviesTable";

const MovieData = () => {
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie?page=0&size=50`
		);
		if (values) {
			setMovieList(values.data.data);
		}
	}

	// useEffect is triggered automatically when a page is loaded
	useEffect(() => {
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, []);

	const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };

	return (
		<Paper style={paperStyle} elevation={4}>
			<Grid container item justifyContent="center" alignContent="center">
				{isLoading ? (
					<CircularProgress />
				) : (
					<MoviesTable movieList={movieList} />
				)}
			</Grid>
		</Paper>
	);
};

export default MovieData;

//here this comp defined in folder admin (file movieTable)<MoviesTable />
