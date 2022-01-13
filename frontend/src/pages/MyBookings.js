import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { MovieBookingTable } from "../components/MovieBookingTable";

const MyBookings = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [myBookingList, setMyBookingList] = useState([]);

	const navigate = useNavigate();

	const getMyBookings = async () => {
		const userToken = localStorage.getItem("userToken")
			? localStorage.getItem("userToken")
			: navigate("/login");
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/booking/mybookings`,
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		);

		if (response.data.statusCode === 200) {
			setMyBookingList(response.data.data);
		} else {
			alert("Something went wrong!");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getMyBookings();
		setIsLoading(false);
	}, []);

	return (
		<div>
			{isLoading ? (
				<CircularProgress />
			) : (
				<MovieBookingTable movieBookingList={myBookingList} />
			)}
		</div>
	);
};

export { MyBookings };
