import React, { useState, useEffect } from "react";
import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovieForm = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [inputMovieName, setMovieName] = useState("");
	const [inputMovieGenre, setMovieGenre] = useState("");
	const [inputMoviePoster, setMoviePoster] = useState("");

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const addNewMovie = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie`,
			{
				movieName: inputMovieName,
				movieGenre: inputMovieGenre,
				poster: inputMoviePoster,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			}
		);
		navigate("/");
	};

	return (
		<Grid>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Paper elevation="10" style={paperStyle}>
					<Grid align="center">
						<h2 style={headerStyle}>Add New Movie</h2>
						<Typography>Enter New MovieData</Typography>
					</Grid>
					<form>
						<TextField
							fullWidth
							label="MovieName"
							placeholder="Enter MovieName"
							value={inputMovieName}
							onChange={(e) => setMovieName(e.target.value)}
						/>
						<TextField
							fullWidth
							label="MovieGenre"
							placeholder="Enter MovieGenre"
							value={inputMovieGenre}
							onChange={(e) => setMovieGenre(e.target.value)}
						/>

						<TextField
							fullWidth
							label="MovieUrl"
							placeholder="Enter Movie Url"
							value={inputMoviePoster}
							onChange={(e) => setMoviePoster(e.target.value)}
						/>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
							onClick={(event) => {
								event.preventDefault();
								addNewMovie();
							}}
						>
							ADD
						</Button>
					</form>
				</Paper>
			)}
		</Grid>
	);
};

export default AddMovieForm;

// {
// 	headers: {
// 		Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// 	},
// }
