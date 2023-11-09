import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, IconButton, Fade } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import EditPage from "./EditPage";
import EmpInfoPage from "./EmpInfoPage";
function ITDepartmentScreen() {
  const [data, setData] = useState([]);
  const [locationSelected, setLocationSelected] = useState();
  const [floor, setFloor] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchOption, setSearchOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterArr, setFilterArr] = useState([]);
  const [editRow, setEditRow] = useState();
  const [openEditPage, setOpenEditPage] = useState(false);

  const [openEmpInfoPage, setOpenEmpInfoPage] = useState(false);
  const [empInfo, setEmpInfo] = useState();
  const [shiftType, setShiftType] = useState();
  const [seatId, setEmpSeatId] = useState();

  const [shortSearchValue, setShortSearchValue] = useState();
  const [pageSize, setPageSize] = useState();
  // pageSize handlePageSizeChange

  const openFilter = Boolean(anchorEl);
  const handleClickFilterIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };
  const selectFilter = (filterValue) => {
    //console.log(e.target.value);
    if (filterValue === "All") {
      if (filterArr?.includes(filterValue)) {
        // const x = filterArr?.filter((item) => item !== filterValue);
        setFilterArr([]);
      } else {
        setFilterArr([
          "Occupied Day Shift Only",
          "Occupied Night Shift Only",
          "Both Shift Occupied",
          "Vaccant",
          "Vaccant Night Shift Only",
          "Vaccant Day Shift Only",
          "All",
        ]);
      }
    } else {
      if (filterArr?.includes(filterValue)) {
        const x = filterArr?.filter((item) => item !== filterValue);
        setFilterArr([...x]);
      } else {
        setFilterArr([...filterArr, filterValue]);
      }
    }
  };
  const handleChangeLocation = (event) => {
    setLocationSelected(event.target.value);
  };
  const handleChangeSearchBy = (event) => {
    setSearchOption(event.target.value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };
  const onChangeSearchTextfield = (event) => {
    // setTimeout(() => {
    setSearchValue(event.target.value);
    // }, 1000);
  };
  const floorArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const onChangeFloor = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    if (value[value.length - 1] === "All") {
      setFloor(floor.length === floorArr.length ? [] : [...floorArr]);
      //setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setFloor(typeof value === "string" ? value.split(",") : value);
  };

  const getFilteredList = () => {
    setIsLoading(true);
    if (filterArr?.length > 0) {
      const _data = bangloreData
        ?.filter((data) => {
          return floor.includes(data.floor);
        })
        ?.filter((bd) => {
          if (filterArr.includes("Occupied Day Shift Only")) {
            if (Boolean(bd.dayShift) && !Boolean(bd.nightShift)) {
              return bd;
            }
          }
          if (filterArr.includes("Occupied Night Shift Only")) {
            if (!Boolean(bd.dayShift) && Boolean(bd.nightShift)) {
              return bd;
            }
          }
          if (filterArr.includes("Both Shift Occupied")) {
            if (Boolean(bd.dayShift) && Boolean(bd.nightShift)) {
              return bd;
            }
          }
          if (filterArr.includes("Vaccant")) {
            if (!Boolean(bd.dayShift) && !Boolean(bd.nightShift)) {
              //Vaccant Night Shift Only
              return bd;
            }
          }
          if (filterArr.includes("Vaccant Night Shift Only")) {
            if (!Boolean(bd.nightShift)) {
              //Vaccant Night Shift Only
              return bd;
            }
          }
          if (filterArr.includes("Vaccant Day Shift Only")) {
            if (!Boolean(bd.dayShift)) {
              //Vaccant Night Shift Only
              return bd;
            }
          }
        });
      // setTimeout(() => {
      //   setData([..._data]);
      //   setIsLoading(false);
      //   setAnchorEl(null);
      // }, [1000]);
      return _data;
    } else {
      const _data = bangloreData?.filter((bd) => {
        return floor.includes(bd.floor);
      });
      //setData([..._data]);
      return _data;
    }
  };

  const onChangeShortSearchTextfield = (event) => {
    // setTimeout(() => {
    setShortSearchValue(event.target.value);
    // }, 1000);
  };
  //const seatStatus = ["Occupied Day Shift Only","Occupied Night Shift Only","Both Shift Occupied","Vaccant","Vaccant Day Shift","Vaccant Night Shift"]
  const bangloreData = [
    {
      seatId: "SE-BLR-1F-001",
      floor: 1,
      dayShift: "Birendra",
      nightShift: "sham",
      dayShiftstatus: true,
      nightShiftStatus: true,
    },
    {
      seatId: "SE-BLR-1F-002",
      floor: 1,
      dayShift: "",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-1F-003",
      floor: 1,
      dayShift: "Ramush",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-1F-004",
      floor: 1,
      dayShift: "",
      nightShift: "Shamush",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },

    {
      seatId: "SE-BLR-2F-001",
      floor: 2,
      dayShift: "Birendra",
      nightShift: "sham",
      dayShiftstatus: true,
      nightShiftStatus: true,
    },
    {
      seatId: "SE-BLR-2F-002",
      floor: 2,
      dayShift: "",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-2F-003",
      floor: 2,
      dayShift: "Ramush",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-2F-004",
      floor: 2,
      dayShift: "",
      nightShift: "Shamush",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },

    {
      seatId: "SE-BLR-3F-001",
      floor: 3,
      dayShift: "Birendra",
      nightShift: "sham",
      dayShiftstatus: true,
      nightShiftStatus: true,
    },
    {
      seatId: "SE-BLR-3F-002",
      floor: 3,
      dayShift: "",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-3F-003",
      floor: 3,
      dayShift: "Ramush",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-3F-004",
      floor: 3,
      dayShift: "",
      nightShift: "Shamush",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },

    {
      seatId: "SE-BLR-4F-001",
      floor: 4,
      dayShift: "Birendra",
      nightShift: "sham",
      dayShiftstatus: true,
      nightShiftStatus: true,
    },
    {
      seatId: "SE-BLR-4F-002",
      floor: 4,
      dayShift: "",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-4F-003",
      floor: 4,
      dayShift: "Ramush",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-4F-004",
      floor: 4,
      dayShift: "",
      nightShift: "Shamush",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },

    {
      seatId: "SE-BLR-5F-001",
      floor: 5,
      dayShift: "Birendra",
      nightShift: "sham",
      dayShiftstatus: true,
      nightShiftStatus: true,
    },
    {
      seatId: "SE-BLR-5F-002",
      floor: 5,
      dayShift: "",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-5F-003",
      floor: 5,
      dayShift: "Ramush",
      nightShift: "",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
    {
      seatId: "SE-BLR-5F-004",
      floor: 5,
      dayShift: "",
      nightShift: "Shamush",
      dayShiftstatus: false,
      nightShiftStatus: false,
    },
  ];

  const onEditIconClick = (row) => {
    setEditRow(row);
    setOpenEditPage(true);
  };
  const closeEditPage = () => {
    setEditRow(undefined);
    setOpenEditPage(false);
  };

  const onEmpClick = (empInfo, shiftType, seatId) => {
    setOpenEmpInfoPage(true);
    setEmpInfo(empInfo);
    setShiftType(shiftType);
    setEmpSeatId(seatId);
  };
  const closeEmpInfoPage = () => {
    setOpenEmpInfoPage(false);
    setEmpInfo(undefined);
    setShiftType(undefined);
  };
  useEffect(() => {
    if (floor?.length > 0 && Boolean(locationSelected)) {
      setIsLoading(true);
      console.log(floor);
      const _data = bangloreData?.filter((bd) => {
        return floor.includes(bd.floor);
      });
      console.log(_data);
      setTimeout(() => {
        //setData([..._data]);
        const _data = getFilteredList();
        setData([..._data]);
        setIsLoading(false);
      }, [1000]);
    }
  }, [floor, locationSelected]);
  const _getFilteredList = () => {
    const __data = getFilteredList();

    if (
      Boolean(searchOption) &&
      Boolean(searchValue) &&
      searchValue?.length > 0
    ) {
      const regexp = new RegExp(searchValue, "i");
      // const __data = getFilteredList();
      if (searchOption === "Name") {
        const filteredData = __data?.filter(
          (d) => regexp.test(d.dayShift) || regexp.test(d.nightShift)
        );
        setData([...filteredData]);
        setIsLoading(false);
      } else if (searchOption === "Seat Id") {
        const filteredData = __data?.filter((d) => regexp.test(d.seatId));
        setData([...filteredData]);
        setIsLoading(false);
      }
    } else {
      setData([...__data]);
      setIsLoading(false);
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    if (
      Boolean(searchOption) &&
      Boolean(searchValue) &&
      searchValue?.length > 0
    ) {
      const regexp = new RegExp(searchValue, "i");
      const __data = getFilteredList();
      if (searchOption === "Name") {
        const filteredData = __data?.filter(
          (d) => regexp.test(d.dayShift) || regexp.test(d.nightShift)
        );
        setData([...filteredData]);
        setIsLoading(false);
      } else if (searchOption === "Seat Id") {
        const filteredData = __data?.filter((d) => regexp.test(d.seatId));
        setData([...filteredData]);
        setIsLoading(false);
      } else {
        setData([...__data]);
        setIsLoading(false);
      }
    } else if (Boolean(floor) && Boolean(locationSelected)) {
      const __data = getFilteredList();
      setData([...__data]);
      setIsLoading(false);
    }
  }, [searchOption, searchValue]);

  useEffect(() => {
    if (shortSearchValue?.length > 0) {
      const regexp = new RegExp(shortSearchValue, "i");
      const __data = getFilteredList();
      const filteredData = __data?.filter((d) => regexp.test(d.seatId));
      console.log("filteredData", filteredData);
      console.log(shortSearchValue);
      setIsLoading(false);
      setData([...filteredData]);
    } else {
      const data = getFilteredList();
      setData([...data]);
      setIsLoading(false);
    }
  }, [shortSearchValue]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12} md={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locationSelected}
                label="Choose Location"
                onChange={handleChangeLocation}
              >
                <MenuItem value="Bengalore">Bengalore</MenuItem>
                <MenuItem value="Coimbtore">Coimbtore</MenuItem>
                <MenuItem value="Mohali">Mohali</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12} md={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-floor">
                Select Floor(s)
              </InputLabel>
              <Select
                multiple
                labelId="demo-simple-select-floor"
                value={floor}
                label=" Select Floor(s)"
                onChange={onChangeFloor}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Floor No</em>
                </MenuItem>
                <MenuItem key="All" value="All">
                  <em> All Floor</em>
                </MenuItem>
                {floorArr.map((flr) => (
                  <MenuItem key={flr} value={flr}>
                    {flr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-pagesize">
                Select Page Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-pagesize"
                id="demo-simple-select"
                value={pageSize}
                label=" Select Page Size"
                onChange={handlePageSizeChange} //
              >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="40">40</MenuItem>
                <MenuItem value="40">50</MenuItem>
                <MenuItem value="40">60</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Search By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchOption}
                label="Search By"
                onChange={handleChangeSearchBy}
              >
                <MenuItem value="Name">Name</MenuItem>
                <MenuItem value="Seat Id">Seat Id</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12} md={4}>
            <FormControl fullWidth>
              <TextField
                onChange={(e) => {
                  onChangeSearchTextfield(e);
                }}
                value={searchValue}
                id="outlined-error-helper-text"
                label="Enter Name/SeatId"
              />
            </FormControl>
          </Grid>
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
            }}
            item
            sm={2}
            xs={6}
            md={2}
          >
            <Box style={{ cursor: "pointer" }}>
              <IconButton
                id="demo-positioned-button"
                aria-controls={openFilter ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? "true" : undefined}
                onClick={handleClickFilterIcon}
                fontSize="small"
              >
                <FilterListIcon />
              </IconButton>
            </Box>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={openFilter}
              onClose={handleCloseFilter}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Filter By</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes("All")}
                        onChange={() => {
                          selectFilter("All");
                        }}
                        name="All"
                      />
                    }
                    label="All"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes("Vaccant")}
                        onChange={() => {
                          selectFilter("Vaccant");
                        }}
                        name="Vaccant"
                      />
                    }
                    label="Vaccant"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes("Both Shift Occupied")}
                        onChange={() => {
                          selectFilter("Both Shift Occupied");
                        }}
                        name="Both Shift Occupied"
                      />
                    }
                    label="Both Shift Occupied"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes("Vaccant Day Shift Only")}
                        onChange={() => {
                          selectFilter("Vaccant Day Shift Only");
                        }}
                        name="Vaccant Day Shift Only"
                      />
                    }
                    label="Vaccant Day Shift Only"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes(
                          "Vaccant Night Shift Only"
                        )}
                        onChange={() => {
                          selectFilter("Vaccant Night Shift Only");
                        }}
                        name="Vaccant Night Shift Only"
                      />
                    }
                    label="Vaccant Night Shift Only"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes("Occupied Day Shift Only")}
                        onChange={() => {
                          selectFilter("Occupied Day Shift Only");
                        }}
                        name="Occupied Day Shift Only"
                      />
                    }
                    label="Occupied Day Shift Only"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterArr?.includes(
                          "Occupied Night Shift Only"
                        )}
                        onChange={() => {
                          selectFilter("Occupied Night Shift Only");
                        }}
                        name="Occupied Night Shift Only"
                      />
                    }
                    label="Occupied Night Shift Only"
                  />
                </FormGroup>
              </FormControl>
              <Box paddingBlock={2} display="flex" justifyContent="right">
                <Button
                  onClick={() => {
                    handleCloseFilter();
                    setFilterArr([]);
                  }}
                >
                  Discard
                </Button>
                <Button onClick={_getFilteredList}>Filter</Button>
              </Box>
            </Menu>
          </Grid>

          <Grid
            style={{
              display: "flex",
              alignItems: "center",
            }}
            item
            sm={2}
            xs={6}
            md={2}
          >
            <Button variant="contained" color="primary">
              Add More
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "lightgray" }}>
              <TableRow>
                <TableCell style={{ width: "320px" }}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" color="#000">
                      Seat No
                    </Typography>
                    <Box paddingLeft={0.5}>
                      <TextField
                        size="small"
                        inputProps={{
                          style: { color: "#000" },
                        }}
                        onChange={(e) => {
                          onChangeShortSearchTextfield(e);
                        }}
                        value={shortSearchValue}
                        // id="outlined-error-helper-text"
                        label="Search Seat No"
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#000" variant="h6">
                    Floor
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#000" variant="h6">
                    Day Shift
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="#000" variant="h6">
                    Night Shift
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography color="#000" variant="h6">
                    Edit
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography color="#000" variant="h6">
                    Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Box
                key="loading"
                display="flex"
                justifyContent="center"
                paddingLeft="40vw"
                // sx={{
                //   "&:last-child td, &:last-child th": { border: 0 },
                // }}
              >
                <CircularProgress
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                />
              </Box>
            ) : (
              <TableBody sx={{ backgroundColor: "#f7f5ed" }}>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Tooltip title="B-Wing 3rd Row" placement="right-start">
                        {row.seatId}
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center" scope="row">
                      {row.floor}
                    </TableCell>
                    <TableCell align="center">
                      {Boolean(row.dayShift) ? (
                        <Box
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            onEmpClick(row.dayShift, "Day", row.seatId);
                          }}
                        >
                          {" "}
                          {row.dayShift}
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() => {
                            onEmpClick(row.dayShift, "Day", row.seatId);
                          }}
                        >
                          <PersonIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Boolean(row.nightShift) ? (
                        <Box
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            onEmpClick(row.nightShift, "Night", row.seatId);
                          }}
                        >
                          {row.nightShift}
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() => {
                            onEmpClick(row.nightShift, "Night", row.seatId);
                          }}
                        >
                          <PersonIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          // handleClickOpenEdit(row);
                          onEditIconClick(row);
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
                          //handleClickOpenDelete(row);
                        }}
                      >
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {/* )} */}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Fade in={data?.length === 0} unmountonExit>
          <Box paddingY={2} display="flex" justifyContent="center">
            <Typography>No Data To Show</Typography>
          </Box>
        </Fade>
      </Box>

      <Fade in={Boolean(editRow) && openEditPage} unmountOnExit>
        <Box>
          <EditPage
            editRow={editRow}
            closeEditPage={closeEditPage}
            openEditPage={openEditPage}
          />
        </Box>
      </Fade>

      <Fade in={openEmpInfoPage} unmountOnExit>
        <Box>
          <EmpInfoPage
            closeEmpInfoPage={closeEmpInfoPage}
            openEmpInfoPage={openEmpInfoPage}
            empInfo={empInfo}
            shiftType={shiftType}
            seatId={seatId}
          />
        </Box>
      </Fade>
    </>
  );
}
export default ITDepartmentScreen; //
