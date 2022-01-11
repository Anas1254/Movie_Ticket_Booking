import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React from "react";

function EditPageMovie(props) {
  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: "5px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid>
      <Paper elevation="10" style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>EditPage</h2>
          <Typography>Enter Changes</Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="MovieName"
            placeholder="Enter MovieName"
          />
          <TextField
            fullWidth
            label="MovieGenre"
            placeholder="Enter MovieGenre"
          />

          <TextField fullWidth label="MovieUrl" placeholder="Enter Movie Url" />

          <Button fullWidth type="submit" variant="contained" color="primary">
            update
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default EditPageMovie;
