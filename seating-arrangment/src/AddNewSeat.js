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

function AddNewSeat({
  handleClickOpenAddMore,
  openAddMore,
  handleClickCloseAddMore,

  locationSelected,
  selectedFloor,
}) {
  const [addDayShiftEmp, setAddDayShiftEmp] = useState();
  const [addNightShiftEmp, setAddNightShiftEmp] = useState();

  return (
    <Dialog
      open={openAddMore}
      TransitionComponent={Transition}
      //keepMounted
      fullWidth
      maxWidth="md"
      onClose={handleClickCloseAddMore}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Add a New Seat`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box display="flex" marginBlock={1}>
            <Box width="0.5" display="flex" justifyContent="left">
              <TextField label="Location" value={locationSelected} disabled />
            </Box>
            <Box width="0.5" display="flex" justifyContent="left">
              <TextField label="Seat No" />
            </Box>
            <Box width="0.5" display="flex" justifyContent="right">
              <TextField label="Floor" value={selectedFloor} disabled />
            </Box>
          </Box>

          <Box display="flex" marginBlock={1}>
            <Box width="0.5" display="flex" justifyContent="left">
              <Box>
                <Typography>Select Day Shift Employee</Typography>
                <SearchBox
                  value={addDayShiftEmp}
                  setValue={setAddDayShiftEmp}
                />
              </Box>
            </Box>

            <Box width="0.5" display="flex" justifyContent="right">
              <Box>
                <Typography>Select Night Shift Employee</Typography>
                <SearchBox
                  value={addNightShiftEmp}
                  setValue={setAddNightShiftEmp}
                />
              </Box>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCloseAddMore}>Discard</Button>
        <Button onClick={handleClickCloseAddMore}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewSeat;
