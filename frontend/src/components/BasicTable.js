import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

function BasicTable(props) {
	const paperStyle = { padding: "30px 20px", margin: "20px auto" };
	const [movieScheduleData, setMovieScheduleData] = useState([]);

	useEffect(
		() => setMovieScheduleData(props.movieSchedule),
		[props.movieSchedule]
	);

	return (
		<Grid>
			<Paper elevation={0} style={paperStyle}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Sr No</TableCell>
								<TableCell align="right">Time</TableCell>
								<TableCell align="right">Date</TableCell>
								<TableCell align="right">Seats</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{movieScheduleData.map((row, index) => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell align="right">{row.movieTime}</TableCell>
									<TableCell align="right">{row.movieDate}</TableCell>
									<TableCell align="right">{row.seats}</TableCell>
									<TableCell align="right">{row.costPerSeat}</TableCell>
									<TableCell align="right">
										<Link to={`/user/bookshow/${row.id}`}>
											<Button variant="contained">BookShow</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Grid>
	);
}

export default BasicTable;

// const [isLoading, setLoading] = useState(false);

// const getMovieData = async () => {
//   const data = await axios.get("/api/ongoing");
//   const filteredData = data.filter((item) => item.movieId === props.movieId);
//   setMovieData(filteredData);
// };

// useEffect(() => {
//   setLoading(true);
//   getMovieData();
//   setLoading(false);
// }, []);
