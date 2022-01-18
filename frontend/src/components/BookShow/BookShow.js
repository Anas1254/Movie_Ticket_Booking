import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import BasicTable from "../BasicTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const BookShow = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [values, setMovieValues] = useState([]);
	const [movieName, setMovieName] = useState("");
	const [movieGenre, setMovieGenre] = useState("");
	const [movieImage, setMovieImage] = useState("");
	const id = useParams().id;

	//Send get request to backend for getting list of movies
	async function FetchBookMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/list/${id}`
		);
		console.log(values);
		if (values) {
			setMovieValues(values.data.data);
			setMovieName(values.data.data[0].movie.movieName);
			setMovieGenre(values.data.data[0].movie.movieGenre);
			setMovieImage(values.data.data[0].movie.poster);
		}
	}

	useEffect(() => {
		setIsLoading(true);
		FetchBookMovieData();
		setIsLoading(false);
	}, []);

	return (
		<div>
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<Grid container spacing={4} direction="row">
						<Grid item>
							<img src={movieImage} alt="Movie-Poster" />
						</Grid>
						<Grid item justifyContent="center" alignContent="center">
							<h3>Movie Name: {movieName}</h3>
							<h4>Movie Genre: {movieGenre}</h4>
						</Grid>
					</Grid>
				</>
			)}
			<Grid>
				{isLoading ? (
					<CircularProgress />
				) : (
					<BasicTable movieSchedule={values} />
				)}
			</Grid>
		</div>
	);
};

export default BookShow;
