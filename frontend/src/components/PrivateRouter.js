import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRouter = (props) => {
	const userToken = localStorage.getItem("userToken")
		? localStorage.getItem("userToken")
		: "";

	return userToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export { PrivateRouter };
