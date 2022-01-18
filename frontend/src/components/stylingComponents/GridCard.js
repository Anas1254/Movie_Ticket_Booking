import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import TemplateCard from "../TemplateCard";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function GridCard() {
	let keyword = useParams().keyword;
	keyword = keyword ? keyword : "";
	const [userToken, setUserToken] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [movieList, setMovieList] = useState([]); //this values is coming form the backend(movieList)

	const movieDisplay = (values) => {
		return (
			<TemplateCard
				movieId={values.id}
				imgsrc={values.poster}
				movieGenre={values.movieGenre}
				movieName={values.movieName}
			/>
		);
	};

	//Send get request to backend for getting list of movies
	async function getMovieData() {
		const values = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/movie?page=0&size=8&term=${keyword}`
		);
		if (values) {
			setMovieList(values.data.data);
		}
	}

	// useEffect is triggered automatically when a page is loaded
	useEffect(() => {
		setUserToken(
			localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
		);
		setIsLoading(true);
		getMovieData();
		setIsLoading(false);
	}, [userToken, keyword]);

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-around"
			alignItems="center"
			spacing={8}
			sx={{ padding: "40px" }}
		>
			{isLoading ? (
				<CircularProgress />
			) : (
				movieList.map((value) => <Grid item>{movieDisplay(value)}</Grid>)
			)}
			<ToastContainer />
		</Grid>
	);
}

export default GridCard;
