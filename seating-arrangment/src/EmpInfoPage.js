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
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import { Box, Typography, Grid, Button, IconButton, Fade } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmpInfoPage({
  closeEmpInfoPage,
  openEmpInfoPage,
  empInfo,
  shiftType,
  seatId,
}) {
  const [empAdded, setEmpAdded] = useState(); //if employee is empty for the seat or employee has been deleted and after that if added
  const [openCnfDialog, setOpenCnfDialog] = useState(false);
  const [deleted, setDeleted] = useState(false); //to click on cross button to remove and then add emp
  const handleChangeEmployeeAdded = (event) => {
    setEmpAdded(event.target.value);
  };

  const handleCloseCnfDialogBox = () => {
    setOpenCnfDialog(false);
  };
  const confirmDelete = () => {
    setDeleted(true);
    setOpenCnfDialog(false);
  };
  return (
    <>
      <Dialog
        open={openEmpInfoPage}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        onClose={closeEmpInfoPage}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {Boolean(empInfo)
            ? "Employee Information"
            : `No Employee Has been Alloted This Seat ${seatId}, Please Assign One`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Fade in={Boolean(empInfo)} unmountOnExit>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box display="flex">
                  <Fade in={!deleted} unmountOnExit>
                    <Typography
                      fontSize={15}
                      color="#000"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Emp Name:{" "}
                      <span style={{ display: "flex" }}>
                        <Typography color="GrayText">{empInfo}</Typography>
                      </span>
                      <span>
                        <Tooltip title="Unassign">
                          <IconButton
                            onClick={() => {
                              setOpenCnfDialog(true);
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </span>
                    </Typography>
                  </Fade>
                  <Fade in={deleted} unmountOnExit>
                    <Box
                      paddingTop={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <SearchBox value={empAdded} setValue={setEmpAdded} />
                    </Box>
                  </Fade>
                </Box>
                <Fade in={!deleted} unmountOnExit>
                  <Box display="flex">
                    <Typography
                      fontSize={15}
                      color="#000"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Emp Id:{" "}
                      <span style={{ display: "flex" }}>
                        <Typography color="GrayText">41633</Typography>
                      </span>
                    </Typography>
                  </Box>
                </Fade>
                <Box display="flex">
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Shift:{" "}
                    <span style={{ display: "flex" }}>
                      &nbsp;&nbsp;
                      <Typography color="GrayText">{shiftType}</Typography>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Fade>
            <Fade in={!Boolean(empInfo)} unmountOnExit>
              <Box
                padding={2}
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box width={0.5} display="flex">
                  <Typography
                    fontSize={15}
                    color="#000"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Shift:{" "}
                    <span style={{ display: "flex" }}>
                      <Typography color="GrayText">{shiftType}</Typography>
                    </span>
                  </Typography>
                </Box>
                <Box width={0.5}>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Emp.Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={empAdded}
                      label="Emp.Name"
                      onChange={handleChangeEmployeeAdded}
                    >
                      <MenuItem value="Birendra">Birendra</MenuItem>
                      <MenuItem value="Bhoopendra jogi">
                        Bhoopendra jogi
                      </MenuItem>
                      <MenuItem value="Mahesh">Mahesh</MenuItem>
                      <MenuItem value="Challe">Challe</MenuItem>
                    </Select>
                  </FormControl> */}
                  <SearchBox value={empAdded} setValue={setEmpAdded} />
                </Box>
              </Box>
            </Fade>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmpInfoPage}>Close</Button>
          <Fade in={!Boolean(empInfo) && empAdded} unmountOnExit>
            <Button onClick={closeEmpInfoPage}>Assign</Button>
          </Fade>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCnfDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCnfDialogBox}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Are you sure you want to Unassign ${empInfo}  from seat no ${seatId} `}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleCloseCnfDialogBox}>Discard</Button>
          <Button onClick={confirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmpInfoPage;
