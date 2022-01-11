import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OnGoingMovieData from "../../data/OnGoingMovieData";
import CustomButton from "../stylingComponents/Button";
import { Link } from "react-router-dom";

function OngoingMovie() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>MovieName</TableCell>
            <TableCell>Movie Time</TableCell>
            <TableCell align="right">Movie Date</TableCell>
            <TableCell align="right">Available Seats</TableCell>
            <TableCell align="right">Cost per Seat</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OnGoingMovieData.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{item.movieName}</TableCell>
              <TableCell>{item.movieTime}</TableCell>
              <TableCell align="right">{item.movieDate}</TableCell>
              <TableCell align="right">{item.seats}</TableCell>
              <TableCell align="right">{item.costPerSeat}</TableCell>
              <TableCell align="right">
                <Link to="../pages/EditPageOngoingMovie">
                  <CustomButton title="Edit" />
                </Link>
              </TableCell>
              <TableCell align="right">
                <CustomButton title="Delete" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OngoingMovie;

// component="th" scope="row"
