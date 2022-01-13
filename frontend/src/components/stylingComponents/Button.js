import React from "react";
import { Button } from "@mui/material";

const CustomButton = (props) => {
	return (
		<Button variant="contained" onClick={props.onClick && props.onClick}>
			{props.title}
		</Button>
	);
};

export default CustomButton;
