import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Grid,
	TextField,
	CircularProgress,
	Button,
	Paper,
	Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const BookshowForm = () => {
	const [movieName, setMovieName] = useState("");
	const [movieDate, setMovieDate] = useState("");
	const [movieTime, setMovieTime] = useState("");
	const [costPerSeat, setCostPerSeat] = useState(0);
	const [seats, setSeats] = useState(0);
	const [inputSeats, setInputSeats] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();

	const paperStyle = { padding: "30px 20px", width: 400, margin: "60px auto" };
	const headerStyle = { margin: "5px auto" };

	const getMovieData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/${id}`
		);
		if (response.data) {
			setMovieDate(response.data.data[0].movieTime);
			setMovieTime(response.data.data[0].movieDate);
			setMovieName(response.data.data[0].movie.movieName);
			setCostPerSeat(response.data.data[0].costPerSeat);
			setSeats(response.data.data[0].seats);
		} else {
			toast.error("Error getting information for the show");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, []);

	const handleMovieSeatChange = (event) => {
		setInputSeats(event.target.value);
	};

	const bookshow = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/booking`,
			{
				seats: inputSeats.toString(),
				payableAmount: (inputSeats * costPerSeat).toString(),
				ongoingId: id,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
				validateStatus: function (status) {
					return status < 500;
				},
			}
		);
		console.log(response);
		if (response.data?.statusCode === 200) {
			toast.info(`You have successfully booked ${inputSeats} seats`);
			setTimeout(() => navigate("/"), 6000);
		} else {
			toast.error("Something went wrong while booking!");
		}
	};
	const submitHandler = (event) => {
		event.preventDefault();
		console.log("submit handler calling");
		bookshow();
	};

	return (
		<Grid
			container
			direction="column"
			rowSpacing={4}
			alignItems="center"
			justifyContent="center"
		>
			<Paper elevation="10" style={paperStyle}>
				{isLoading ? (
					<CircularProgress />
				) : (
					<form onSubmit={submitHandler}>
						<Grid align="center">
							<h2 style={headerStyle}>BookShow</h2>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-helperText"
								label="Movie Name"
								value={movieName}
								disabled
								fullWidth
							/>
						</Grid>
						<Grid item>
							<TextField
								label="Movie Date"
								id="movie_date"
								value={movieDate}
								disabled
								fullWidth
							/>
						</Grid>
						<Grid item>
							<TextField
								id="movie_time"
								value={movieTime}
								label="Movie Time"
								disabled
							/>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-helperText"
								label="Number of Seats"
								value={inputSeats}
								onChange={handleMovieSeatChange}
								fullWidth
							/>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-helperText"
								label="Cost Per Seat"
								value={costPerSeat}
								disabled
								fullWidth
							/>
						</Grid>
						<Typography>
							You need to pay: Rs. {costPerSeat * inputSeats}
						</Typography>
						<Grid item>
							<Button type="submit" variant="contained">
								Submit
							</Button>
						</Grid>
					</form>
				)}
			</Paper>
			<ToastContainer />
		</Grid>
	);
};

export default BookshowForm;
