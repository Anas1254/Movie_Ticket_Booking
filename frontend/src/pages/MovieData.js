import React from "react";
import { Grid } from "@mui/material";
import MoviesTable from "../components/Admin/MoviesTable";

const MovieData = () => {
  return (
    <Grid container item justifyContent="center" alignContent="center">
      <MoviesTable />
    </Grid>
  );
};

export default MovieData;

//here this comp defined in folder admin (file movieTable)<MoviesTable />
