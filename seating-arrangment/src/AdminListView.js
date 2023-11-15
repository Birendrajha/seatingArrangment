import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AdminListViewPage({ data, isLoading, openFloorView }) {
  const rows = [
    { location: "Banglore", floor: "1st", maxCap: "200", reservedSeat: "25" },
    { location: "Banglore", floor: "2nd", maxCap: "200", reservedSeat: "25" },
    { location: "Mohali", floor: "1st", maxCap: "200", reservedSeat: "25" },
    { location: "Mohali", floor: "2nd", maxCap: "200", reservedSeat: "25" },
    { location: "Mohali", floor: "1st", maxCap: "200", reservedSeat: "25" },
    { location: "Mohali", floor: "2nd", maxCap: "200", reservedSeat: "25" },
  ];

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const [dataForDelete, setDataForDelete] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedFloor, setSelectedFloor] = useState();
  const [selectedMaxSeat, setSelectedMaxSeat] = useState();
  const [selectedReserveSeat, setSelectedReserveSeat] = useState();
  const [error, setError] = useState(false);

  const [errFloorMessg, setErrFloorMessg] = useState("");
  const [errMaxCapMessg, setErrorMaxCapMessg] = useState("");
  const [errReservedSeatMessg, setErrReservedMessg] = useState("");

  const handleClickOpenEdit = (row) => {
    setDataForEdit(row);
    console.log(row.location);
    setSelectedLocation(row.location);
    setSelectedFloor(row.floor);
    setSelectedMaxSeat(row.maxCapacity);
    setSelectedReserveSeat(row.reservedSeat);
    setOpenEdit(true);
  };
  const handleClickOpenDelete = (row) => {
    setDataForDelete(row);
    setOpenDelete(true);
  };
  const handleClickCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  const onChangeFloor = (event) => {
    if (Boolean(errFloorMessg)) {
      setErrFloorMessg("");
    }

    const _floor = event.target.value;
    if (_floor >= 20) {
      setErrFloorMessg("Floor should Lies below 20");
    }
    if (isNaN(+_floor)) {
      setErrFloorMessg("Enter valid floor No.");
    }
    setSelectedFloor(event.target.value);
  };

  const onChangeMaxCap = (event) => {
    setSelectedMaxSeat(event.target.value);
    if (Boolean(errMaxCapMessg)) {
      setErrorMaxCapMessg("");
    }
    const _maxCap = event.target.value;
    if (_maxCap > 500) {
      setErrorMaxCapMessg("Max capacity should lies below 500");
    }
  };

  const onChangeReserveSeat = (event) => {
    setSelectedReserveSeat(event.target.value);

    if (Boolean(errReservedSeatMessg)) {
      setErrReservedMessg("");
    }
    const _reservedSeat = event.target.value;
    if (+_reservedSeat >= selectedMaxSeat) {
      setErrReservedMessg("Reserved Seat Cant Exceed Max Capacity");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#000000" }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="antiquewhite">
                  Location
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  Floor
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  Max Capacity
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  Reserved Seat&nbsp;(s)
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  Edit
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  View
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="antiquewhite" variant="h6">
                  Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#f7f5ed" }}>
            {isLoading ? (
              <Box
                key="loading"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CircularProgress />
              </Box>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.location}
                  </TableCell>
                  <TableCell align="center">{row.floor}</TableCell>
                  <TableCell align="center">{row.maxCapacity}</TableCell>
                  <TableCell align="center">{row.reservedSeat}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        handleClickOpenEdit(row);
                      }}
                    >
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        fontSize="small"
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        openFloorView(row);
                      }}
                    >
                      <RemoveRedEyeIcon
                        style={{ cursor: "pointer" }}
                        fontSize="small"
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        handleClickOpenDelete(row);
                      }}
                    >
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        fontSize="small"
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        onClose={handleClickCloseEdit}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit"}</DialogTitle>
        <DialogContent>
          <Box padding={2}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={selectedLocation}
                    id="outlined-error-helper-text1"
                    label="Location"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    error={Boolean(errFloorMessg)}
                    onChange={onChangeFloor}
                    value={selectedFloor}
                    id="outlined-error-helper-text2"
                    label="Enter Floor No"
                    helperText={errFloorMessg}
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeMaxCap}
                    error={Boolean(errMaxCapMessg)}
                    value={selectedMaxSeat}
                    id="outlined-error-helper-text3"
                    label="Max Capacity"
                    helperText={errMaxCapMessg}
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeReserveSeat}
                    value={selectedReserveSeat}
                    error={Boolean(errReservedSeatMessg)}
                    id="outlined-error-helper-text4"
                    label="Reserved Seat"
                    helperText={errReservedSeatMessg}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseEdit}>Discard</Button>
          <Button onClick={handleClickCloseEdit}>Edit</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        onClose={handleClickCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are You Sure You Want To Delete This Row{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDelete}>Discard</Button>
          <Button onClick={handleClickCloseDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminListViewPage;
