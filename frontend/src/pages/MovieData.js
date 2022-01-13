import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import MoviesTable from "../components/Admin/MoviesTable";

const MovieData = () => {
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie?page=0&size=8`
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

	return (
		<Grid container item justifyContent="center" alignContent="center">
			{isLoading ? <CircularProgress /> : <MoviesTable movieList={movieList} />}
		</Grid>
	);
};

export default MovieData;

//here this comp defined in folder admin (file movieTable)<MoviesTable />
