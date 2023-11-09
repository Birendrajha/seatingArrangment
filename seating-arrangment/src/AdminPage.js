import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Fade } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AdminListViewPage from "./AdminListView";

import ITDepartmentScreen from "./ITdepartmentScreen";
function AdminPage() {
  const [location, setLocation] = React.useState("");
  const [floor, setFloor] = useState();
  const [maxCapacity, setMaxCapacity] = useState();
  const [reservedSeat, setReservedSeat] = useState();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errFloorMessg, setErrFloorMessg] = useState("");
  const [errMaxCapMessg, setErrorMaxCapMessg] = useState("");
  const [errReservedSeatMessg, setErrReservedMessg] = useState("");

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const onChangeFloor = (event) => {
    if (error) {
      setError(false);
      setErrFloorMessg("");
    }

    const _floor = event.target.value;

    if (isNaN(+_floor)) {
      setError(true);
      setErrFloorMessg("Enter valid Floor No");
    }
    if (_floor >= 20) {
      setError(true);
      setErrFloorMessg("Floor should Lies below 20");
    }
    setFloor(event.target.value);
  };

  const onChangeMaxCap = (event) => {
    if (Boolean(errMaxCapMessg)) {
      setErrorMaxCapMessg("");
    }
    setMaxCapacity(event.target.value);
    const _maxCap = event.target.value;
    if (_maxCap > 500) {
      setErrorMaxCapMessg("Max capacity should lies below 500");
    }
  };

  const onChangeReserveSeat = (event) => {
    if (Boolean(errReservedSeatMessg)) {
      setErrReservedMessg("");
    }
    setReservedSeat(event.target.value);
    const _reservedSeat = event.target.value;
    if (+_reservedSeat >= maxCapacity) {
      setErrReservedMessg("Reserved Seat Cant Exceed Max Capacity");
    }
  };
  const createSeatList = () => {
    const dataForAlreadySelectedLoc = data.filter(
      (itm) => itm.location === location
    );
    const isDulicate = dataForAlreadySelectedLoc.filter(
      (itm) => itm.floor == floor
    );
    console.log(isDulicate);
    if (isDulicate?.length > 0) {
      setError(true);
      setErrFloorMessg("Data for this floor has already been Added");
      return;
    } else if (reservedSeat >= maxCapacity) {
      setErrReservedMessg("Reserved Seat Cant Exceed Max Capacity");
      return;
    } else {
      setIsLoading(true);
      setData([
        ...data,
        {
          location: location,
          floor: floor,
          maxCapacity: maxCapacity,
          reservedSeat: reservedSeat,
        },
      ]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setData([
      {
        location: "Banglore",
        floor: 1,
        maxCapacity: "200",
        reservedSeat: "25",
      },
      {
        location: "Banglore",
        floor: 2,
        maxCapacity: "200",
        reservedSeat: "25",
      },
      { location: "Mohali", floor: 3, maxCapacity: "200", reservedSeat: "25" },
      { location: "Mohali", floor: 4, maxCapacity: "200", reservedSeat: "25" },
      { location: "Mohali", floor: 5, maxCapacity: "200", reservedSeat: "25" },
      { location: "Mohali", floor: 6, maxCapacity: "200", reservedSeat: "25" },
    ]);
  }, []);
  return (
    <>
      <Box>
        {/* <Fade in={false} unmountonExit>
          <Box>
            <Grid container spacing={1}>
              <Grid item md={3} xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location}
                    label="Location"
                    onChange={handleChangeLocation}
                  >
                    <MenuItem value="Bengalore">Bengalore</MenuItem>
                    <MenuItem value="Coimbtore">Coimbtore</MenuItem>
                    <MenuItem value="Mohali">Mohali</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={3} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeFloor}
                    value={floor}
                    error={Boolean(errFloorMessg)}
                    id="outlined-error-helper-text"
                    label="Enter Floor No"
                    helperText={errFloorMessg}
                  />
                </FormControl>
              </Grid>

              <Grid item md={3} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeMaxCap}
                    value={maxCapacity}
                    error={Boolean(errMaxCapMessg)}
                    id="outlined-error-helper-text"
                    label="Max Capacity"
                    // defaultValue="Hello World"
                    helperText={errMaxCapMessg}
                  />
                </FormControl>
              </Grid>

              <Grid item md={3} xs={6} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeReserveSeat}
                    value={reservedSeat}
                    error={Boolean(errReservedSeatMessg)}
                    id="outlined-error-helper-text"
                    label="Reserved Seat"
                    helperText={errReservedSeatMessg}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="right" paddingTop={2}>
              <Button
                onClick={() => {
                  createSeatList();
                }}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Box>

            <Box paddingTop={2}>
              <AdminListViewPage data={data} isLoading={isLoading} />
            </Box>
          </Box>
        </Fade> */}
      </Box>
      <Box>
        <Fade in={true} unmountonExit>
          <Box>
            <ITDepartmentScreen />
          </Box>
        </Fade>
      </Box>
    </>
  );
}

export default AdminPage;
