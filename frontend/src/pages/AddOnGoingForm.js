import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	CircularProgress,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddOnGoingForm = () => {
	const navigate = useNavigate();
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [inputMovieDate, setMovieDate] = useState();
	const [inputMovieTime, setMovieTime] = useState("");
	const [inputSeats, setMovieSeats] = useState("");
	const [inputCostPerSeats, setCostPerSeats] = useState("");
	const [inputMovieId, setInputMovieId] = useState("");

	const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
	const headerStyle = { margin: "5px auto" };

	const getMovieData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie?page=0&size=8`,
			{
				validateStatus: function (status) {
					return status < 500;
				},
			}
		);

		console.log(response);

		if (response.data) {
			setMovieList(response.data.data);
		} else {
			toast.error(response.data.message);
		}
	};

	const addOngoing = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie`,
			{
				movieDate: inputMovieDate,
				movieTime: inputMovieTime,
				seats: inputSeats,
				costPerSeat: inputCostPerSeats,
				movieId: inputMovieId,
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

		if (response.data.statusCode === 201) {
			toast.success("Schedule added successfully");
			setTimeout(() => {
				navigate("/");
			}, 6000);
		} else {
			toast.error("Failed to add schedule");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, []);

	return (
		<Grid>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Paper elevation="10" style={paperStyle}>
					<Grid align="center">
						<h2 style={headerStyle}>Add New Movie Schedule</h2>
						<Typography>Enter New Movie Schedule</Typography>
					</Grid>
					<form>
						<TextField
							id="date"
							label="Movie Date"
							type="date"
							fullWidth
							placeholder="Enter MovieDate"
							InputLabelProps={{
								shrink: true,
							}}
							value={inputMovieDate}
							onChange={(e) => setMovieDate(e.target.value)}
						/>
						<TextField
							fullWidth
							id="time"
							type="time"
							label="Movie Time"
							placeholder="Enter Movie Time"
							value={inputMovieTime}
							onChange={(e) => setMovieTime(e.target.value)}
						/>

						<TextField
							fullWidth
							label="No of Seats"
							placeholder="Enter Movie seats"
							value={inputSeats}
							onChange={(e) => setMovieSeats(e.target.value)}
						/>
						<TextField
							fullWidth
							label="cost per seats"
							placeholder="Enter cost per seats"
							value={inputCostPerSeats}
							onChange={(e) => setCostPerSeats(e.target.value)}
						/>

						<FormControl fullWidth>
							<InputLabel id="movieName">Movie Name</InputLabel>
							<Select
								labelId="movieName"
								id="movieNameSelect"
								value={inputMovieId}
								label="Age"
								onChange={(e) => setInputMovieId(e.target.value)}
							>
								{movieList.map((item) => {
									return <MenuItem value={item.id}>{item.movieName}</MenuItem>;
								})}
							</Select>
						</FormControl>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
							onClick={(event) => {
								event.preventDefault();
								addOngoing();
							}}
						>
							ADD
						</Button>
					</form>
				</Paper>
			)}
			<ToastContainer />
		</Grid>
	);
};

export { AddOnGoingForm };
