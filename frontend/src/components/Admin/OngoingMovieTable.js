import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import axios from "axios";
import CustomButton from "../stylingComponents/Button";

function OngoingMovie(props) {
	const deleteHandler = async (id) => {
		const response = await axios.delete(
			`${process.env.REACT_APP_BACKEND_URL}/api/currMovie/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
				validateStatus: function (status) {
					return status < 500;
				},
			}
		);

		if (response.data.statusCode === 200) {
			toast.success("Deleted Successfully");
		} else {
			toast.error("Server Error");
		}
	};
	const ShowCurrentDate = () => {
		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		month = String(month).padStart(2, "0");
		var year = new Date().getFullYear();

		return year + "-" + month + "-" + date;
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>MovieName</TableCell>
							<TableCell>Movie Time</TableCell>
							<TableCell align="right">Movie Date</TableCell>
							<TableCell align="right">Available Seats</TableCell>
							<TableCell align="right">Cost per Seat</TableCell>
							<TableCell align="right">Edit</TableCell>
							<TableCell align="right">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.movieList.map((item) => (
							<TableRow
								key={item.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									backgroundColor:
										item.movieDate > ShowCurrentDate() ? "white" : "red",
								}}
							>
								<TableCell>{item.movie.movieName}</TableCell>
								<TableCell>{item.movieTime}</TableCell>
								<TableCell align="right">{item.movieDate}</TableCell>
								<TableCell align="right">{item.seats}</TableCell>
								<TableCell align="right">{item.costPerSeat}</TableCell>
								<TableCell align="right">
									<Link to={`/admin/editOngoingMovie/${item.id}`}>
										<CustomButton title="Edit" />
									</Link>
								</TableCell>
								<TableCell align="right">
									<CustomButton
										title="Delete"
										onClick={() => deleteHandler(item.id)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<ToastContainer />
		</>
	);
}

export default OngoingMovie;

// component="th" scope="row"
