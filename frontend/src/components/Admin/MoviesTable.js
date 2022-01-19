import React from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomButton from "../stylingComponents/Button.js";

const MoviesTable = (props) => {
	const navigate = useNavigate();

	const deleteMovieHandler = async (deleteId) => {
		const userToken = localStorage.getItem("userToken")
			? localStorage.getItem("userToken")
			: navigate("/login");
		const response = await axios.delete(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie/${deleteId}`,
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		);
		if (response.data.statusCode === 200) {
			toast.success("Deleted Successfully");
		}
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Movie Name</TableCell>
							<TableCell align="right">Movie Genre</TableCell>
							<TableCell align="right">Movie URL</TableCell>

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
								<TableCell component="th" scope="row">
									{item.movieName}
								</TableCell>
								<TableCell align="right">{item.movieGenre}</TableCell>
								<TableCell align="right">{item.poster}</TableCell>
								<TableCell align="right">
									<Link to={`/admin/editMovie/${item.id}`}>
										<CustomButton title="Edit" />
									</Link>
								</TableCell>
								<TableCell align="right">
									<CustomButton
										title="Delete"
										onClick={() => deleteMovieHandler(item.id)}
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
};

export default MoviesTable;
