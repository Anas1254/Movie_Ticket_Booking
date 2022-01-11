import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TemplateCard from "../TemplateCard";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function GridCard() {
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
      `http://5d53-2405-201-2010-2834-4c5c-ca9e-4622-4b86.ngrok.io/api/movie?page=0&size=8`
    );
    if (values) {
      setMovieList(values.data.data);
    }
  }

  // useEffect is triggered automatically when a page is loaded
  useEffect(() => {
    setIsLoading(true);
    getMovieData();
    setIsLoading(false);
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        movieList.map((value) => <Grid item>{movieDisplay(value)}</Grid>)
      )}
    </Grid>
  );
}

export default GridCard;
