import React, { useState, useEffect } from "react";
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
import { Box, Typography, Grid, Button, IconButton, Fade } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import SearchBox from "./SearchBox";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditPage({ closeEditPage, editRow, openEditPage }) {
  const [editedDayShiftEmp, setEditedDayShiftEmp] = useState();
  const [editedNightShiftEmp, setEditedNightShiftEmp] = useState();
  const [editDayShiftAssigne, setEditDayShiftAssigne] = useState(); //boolean for open dropdown
  const [editNightShiftAssigne, setEditNightShiftAssigne] = useState(); //boolean for open dropdown

  const handleChangeDayShiftAssigne = (event) => {
    setEditedDayShiftEmp(event.target.value);
  };

  const handleChangeNightShiftAssigne = (event) => {
    setEditedNightShiftEmp(event.target.value);
  };

  return (
    <Dialog
      open={openEditPage}
      TransitionComponent={Transition}
      //keepMounted
      fullWidth
      maxWidth="md"
      onClose={closeEditPage}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Edit Seat ${editRow?.seatId}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box>
            {/* <Typography>Basic Info For Seat No. {editRow.seatId}</Typography> */}
            <Typography fontSize={15} color="#000" style={{ display: "flex" }}>
              Basic Info For Seat No.{" "}
              <span>
                <Typography color="GrayText">{editRow?.seatId}</Typography>
              </span>
            </Typography>
            <Typography fontSize={15} color="#000" style={{ display: "flex" }}>
              Location:{" "}
              <span>
                <Typography color="GrayText">Banglore</Typography>
              </span>
            </Typography>
            <Typography fontSize={15} color="#000" style={{ display: "flex" }}>
              Floor:{" "}
              <span>
                <Typography color="GrayText">{editRow?.floor}</Typography>
              </span>
            </Typography>

            {/* Employee Information */}

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box paddingY={2}>
                <Box display="flex">
                  {" "}
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Day Shift Assigne:{" "}
                    <span style={{ display: "flex" }}>
                      <Typography color="GrayText">
                        {editRow?.dayShift}
                      </Typography>
                    </span>
                  </Typography>
                  <Box>
                    <Tooltip title="Wish To Change" placement="right-start">
                      <IconButton
                        onClick={() => {
                          // handleClickOpenEdit(row);
                          //onEditIconClick(row);editDayShiftAssigne,setEditDayShiftAssigne
                          setEditDayShiftAssigne(!editDayShiftAssigne);
                        }}
                      >
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex" }}
                  >
                    HR Id:{" "}
                    <span>
                      <Typography color="GrayText">41633</Typography>
                    </span>
                  </Typography>
                </Box>
                <Fade in={editDayShiftAssigne} unmountOnExit>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Emp.Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={editedDayShiftEmp}
                      label="Emp.Name"
                      onChange={handleChangeDayShiftAssigne}
                    >
                      <MenuItem value="Birendra">Birendra</MenuItem>
                      <MenuItem value="Bhoopendra jogi">
                        Bhoopendra jogi
                      </MenuItem>
                      <MenuItem value="Mahesh">Mahesh</MenuItem>
                      <MenuItem value="Challe">Challe</MenuItem>
                    </Select>
                  </FormControl> */}
                  <Box>
                    <SearchBox
                      value={editedDayShiftEmp}
                      setValue={setEditedDayShiftEmp}
                    />
                  </Box>
                </Fade>
              </Box>
              <Box paddingY={2}>
                <Box display="flex">
                  {" "}
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Night Shift Assigne:{" "}
                    <span style={{ display: "flex" }}>
                      <Typography color="GrayText">
                        {editRow?.nightShift}
                      </Typography>
                    </span>
                  </Typography>
                  <Box>
                    <Tooltip title="Wish To Change" placement="right-start">
                      <IconButton
                        onClick={() => {
                          // handleClickOpenEdit(row);
                          //onEditIconClick(row);
                          setEditNightShiftAssigne(!editNightShiftAssigne);
                        }}
                      >
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex" }}
                  >
                    HR Id:{" "}
                    <span>
                      <Typography color="GrayText">41663</Typography>
                    </span>
                  </Typography>
                </Box>
                <Fade in={editNightShiftAssigne} unmountOnExit>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Emp.Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={editedNightShiftEmp}
                      label="Emp.Name"
                      onChange={handleChangeNightShiftAssigne}
                    >
                      <MenuItem value="Birendra">Birendra</MenuItem>
                      <MenuItem value="Bhoopendra jogi">
                        Bhoopendra jogi
                      </MenuItem>
                      <MenuItem value="Mahesh">Mahesh</MenuItem>
                      <MenuItem value="Challe">Challe</MenuItem>
                    </Select>
                  </FormControl> */}
                  <Box>
                    <SearchBox
                      value={editedNightShiftEmp}
                      setValue={setEditedNightShiftEmp}
                    />
                  </Box>
                </Fade>
              </Box>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditPage}>Disagree</Button>
        <Button onClick={closeEditPage}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPage;
