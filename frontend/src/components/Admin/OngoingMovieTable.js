import React from "react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import CustomButton from "../stylingComponents/Button";

function OngoingMovie(props) {
	return (
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
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							{console.log(item.movie)}
							<TableCell>{item.movie.movieName}</TableCell>
							<TableCell>{item.movieTime}</TableCell>
							<TableCell align="right">{item.movieDate}</TableCell>
							<TableCell align="right">{item.seats}</TableCell>
							<TableCell align="right">{item.costPerSeat}</TableCell>
							<TableCell align="right">
								<Link to="../pages/EditPageOngoingMovie">
									<CustomButton title="Edit" />
								</Link>
							</TableCell>
							<TableCell align="right">
								<CustomButton title="Delete" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default OngoingMovie;

// component="th" scope="row"
