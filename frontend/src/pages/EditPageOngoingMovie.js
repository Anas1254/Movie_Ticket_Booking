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

function EditPageOngoingMovie() {
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
          <Typography>EnterChanges</Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="MovieName"
            placeholder="Enter your MovieName"
          />
          <TextField
            fullWidth
            label="MovieTime"
            placeholder="Enter MovieTime "
          />

          <TextField
            fullWidth
            label="MovieDate"
            placeholder="Enter MovieDate"
          />
          <TextField
            fullWidth
            label="Availble Seats"
            placeholder="Enter AvailbleSeats"
          />
          <TextField
            fullWidth
            label="Cost Per Seat"
            placeholder="Enter Cost Per Seat"
          />

          <Button fullWidth type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default EditPageOngoingMovie;
