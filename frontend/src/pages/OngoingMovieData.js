import React from "react";
import { Grid } from "@mui/material";
import OngoingMovie from "../components/Admin/OngoingMovieTable";

const OngoingMovieData = () => {
  return (
    <Grid container item alignContent="center" justifyContent="center">
      <OngoingMovie />
    </Grid>
  );
};

export default OngoingMovieData;
