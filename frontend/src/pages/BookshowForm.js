import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const BookshowForm = () => {
  const [movieName, setMovieName] = useState("");
  const [movieDate, setMovieDate] = useState([]);
  const [movieTime, setMovieTime] = useState([]);
  const [costPerSeat, setCostPerSeat] = useState(0);
  const [seats, setSeats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const getMovieData = async () => {
    const response = await axios.get(
      `http://cb59-2405-201-2010-2834-21e5-7c21-4ca6-5586.ngrok.io/api/currMovie/${id}`
    );
    if (response.data) {
      const date = response.data.data.map((item) => item.movieDate);
      const time = response.data.data.map((item) => item.movieTime);
      console.log(response.data);
      console.log(date);
      console.log(time);
      setMovieDate(date);
      setMovieTime(time);
      setMovieName(response.data.data[0].movie.movieName);
      setCostPerSeat(response.data.data[0].costPerSeat);
      setSeats(response.data.data[0].seats);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getMovieData();
    setIsLoading(false);
  }, []);

  const handleMovieDateChange = () => {};
  const handleMovieTimeChange = () => {};
  const handleMovieSeatChange = () => {};

  return (
    <Grid container direction="column">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form>
          <Grid item>
            <TextField
              id="outlined-helperText"
              label="Movie Name"
              value={movieName}
            />
          </Grid>
          <Grid>
            <FormControl fullWidth>
              <InputLabel id="">Movie Date</InputLabel>
              <Select
                labelId="movie_date"
                id="movie_date"
                value={movieDate}
                label="Movie Date"
                onChange={handleMovieDateChange}
              >
                {movieDate.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="">Movie Time</InputLabel>
              <Select
                labelId="movie_time"
                id="movie_time"
                value={movieTime}
                label="Movie Time"
                onChange={handleMovieTimeChange}
              >
                {movieTime.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-helperText"
              label="Movie Name"
              value={movieName}
            />
          </Grid>
        </form>
      )}
    </Grid>
  );
};

export default BookshowForm;
