import React from "react";
import {
	Table,
	TableContainer,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Grid,
} from "@mui/material";

const MovieBookingTable = (props) => {
	const paperStyle = { padding: "30px 20px", width: 1000, margin: "20px auto" };
	return (
		<Grid>
			<Paper elevation={4} style={paperStyle}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Movie Name</TableCell>
								<TableCell align="right">Booked Seats</TableCell>
								<TableCell align="right">Total Cost</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.movieBookingList.map((row) => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.ongoing.movie.movieName}
									</TableCell>
									<TableCell align="right">{row.seats}</TableCell>
									<TableCell align="right">{row.payableAmount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Grid>
	);
};

export { MovieBookingTable };
