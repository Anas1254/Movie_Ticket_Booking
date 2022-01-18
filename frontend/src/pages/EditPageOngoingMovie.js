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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function EditPageOngoingMovie() {
	const [userToken, setUserToken] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [movieId, setMovieId] = useState("");
	const [movieName, setMovieName] = useState("");
	const [inputMovieDate, setMovieDate] = useState(new Date());
	const [inputMovieTime, setMovieTime] = useState("");
	const [inputSeats, setMovieSeats] = useState("");
	const [inputCostPerSeats, setCostPerSeats] = useState("");

	const { id } = useParams();
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const getMovieData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/${id}`
		);
		console.log(response);
		if (response.data) {
			setMovieId(response.data.data[0].movieId);
			setMovieName(response.data.data[0].movie.movieName);
			setMovieTime(response.data.data[0].movieTime);
			setMovieDate(new Date(response.data.data[0].setMovieDate));
			setMovieSeats(response.data.data[0].seats);
			setCostPerSeats(response.data.data[0].costPerSeat);
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

	const updateMovieData = async (e) => {
		e.preventDefault();
		console.log({
			movieId,
			inputMovieTime,
			inputMovieDate,
			inputSeats,
			inputCostPerSeats,
		});
		const response = await axios.put(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/${id}`,
			{
				movieId,
				movieTime: inputMovieTime,
				movieDate: inputMovieDate,
				seats: inputSeats,
				costPerSeat: inputCostPerSeats,
			},
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		);
		console.log(response);
		if (response.data.statusCode === 202) {
			toast.success("updated successfully");
			setTimeout(() => {
				navigate("/admin/ongoingmoviedata");
			}, 6000);
		} else {
			toast.error("Update Failed!");
		}
	};

	return (
		<Grid>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Paper elevation={10} style={paperStyle}>
					<Grid align="center">
						<h2 style={headerStyle}>Edit Ongoing Movie</h2>
						<Typography>Enter Changes</Typography>
					</Grid>
					<form onSubmit={updateMovieData}>
						<TextField
							fullWidth
							label="Movie Name"
							placeholder="Enter your MovieName"
							value={movieName}
							onChange={(e) => setMovieName(e.target.value)}
							disabled
						/>
						<TextField
							fullWidth
							type="time"
							label="Movie Time"
							placeholder="Enter MovieTime"
							value={inputMovieTime}
							onChange={(e) => setMovieTime(e.target.value)}
						/>

						<TextField
							fullWidth
							type="date"
							label="Movie Date"
							placeholder="Enter Movie Date"
							value={inputMovieDate}
							onChange={(e) => setMovieDate(e.target.value)}
						/>
						<TextField
							fullWidth
							label="Available Seats"
							placeholder="Enter AvailableSeats"
							value={inputSeats}
							onChange={(e) => setMovieSeats(e.target.value)}
						/>
						<TextField
							fullWidth
							label="Cost Per Seat"
							placeholder="Enter Cost Per Seat"
							value={inputCostPerSeats}
							onChange={(e) => setCostPerSeats(e.target.value)}
						/>

						<Button fullWidth type="submit" variant="contained" color="primary">
							Update
						</Button>
					</form>
				</Paper>
			)}
			<ToastContainer />
		</Grid>
	);
}

export default EditPageOngoingMovie;
