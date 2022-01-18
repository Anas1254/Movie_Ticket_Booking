import React, { useState, useEffect } from "react";
import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPageMovie(props) {
	const [userToken, setUserToken] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [movieName, setMovieName] = useState("");
	const [moviePoster, setMoviePoster] = useState("");
	const [movieGenre, setMovieGenre] = useState("");

	const { id } = useParams();
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const getMovieData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/${id}`
		);
		if (response.data) {
			setMovieName(response.data.data[0].movie.movieName);
			setMovieGenre(response.data.data[0].movie.movieGenre);
			setMoviePoster(response.data.data[0].movie.poster);
		}
	};

	useEffect(() => {
		setUserToken(
			localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
		);
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, []);

	const updateMovieData = async () => {
		const response = await axios.put(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie/${id}`,
			{
				movieName,
				movieGenre,
				moviePoster,
			},
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		);
		console.log(response);
		if (response.data.statusCode === 202) {
			navigate("/admin/moviedata");
		} else {
			alert("Update Failed!");
		}
	};

	return (
		<Grid>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Paper elevation="10" style={paperStyle}>
					<Grid align="center">
						<h2 style={headerStyle}>Edit Movie</h2>
						<Typography>Enter Changes</Typography>
					</Grid>
					<form>
						<TextField
							fullWidth
							label="Movie Name"
							placeholder="Enter Movie Name"
							value={movieName}
							onChange={(e) => setMovieName(e.target.value)}
						/>
						<TextField
							fullWidth
							label="Movie Genre"
							placeholder="Enter Movie Genre"
							value={movieGenre}
							onChange={(e) => setMovieGenre(e.target.value)}
						/>

						<TextField
							fullWidth
							label="Movie Url"
							placeholder="Enter Movie Url"
							value={moviePoster}
							onChange={(e) => setMoviePoster(e.target.value)}
						/>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
							onClick={(e) => {
								e.preventDefault();
								updateMovieData();
							}}
						>
							Update
						</Button>
					</form>
				</Paper>
			)}
		</Grid>
	);
}

export default EditPageMovie;
