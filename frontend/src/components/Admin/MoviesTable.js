import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import movieList from "../../data/MovieListData";
import CustomButton from "../stylingComponents/Button.js";
import { Link } from "react-router-dom";

const MoviesTable = () => {
  return (
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
          {movieList.map((item) => (
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
                <Link to="../pages/EditPage">
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
};

export default MoviesTable;
