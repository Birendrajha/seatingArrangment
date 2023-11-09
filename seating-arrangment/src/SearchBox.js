import React, { useState, useEffect } from "react";
import { FormControl, Menu, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

function SearchBox({ value, setValue }) {
  //const [value, setValue] = useState(""); // Here we'll store the value of the search bar's text input
  const [suggestions, setSuggestions] = useState([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [debounceValue, setDebouncedValue] = useState("");
  const findResult = (title) => {
    //setResult(suggestions.find((suggestion) => suggestion.title === title));
    setValue(title);
    setResult(title);
    setHideSuggestions(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log("debounceValue", debounceValue);
    const fetchData = async () => {
      try {
        fetch("https://api.github.com/users")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const userData = data.map((item) => item.login);
            setSuggestions(userData);
            setHideSuggestions(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (debounceValue?.length > 3) {
      fetchData();
    } else {
      setSuggestions([]);
      setHideSuggestions(true);
      setAnchorEl(null);
    }
  }, [debounceValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, 500]);
  console.log("anchorEl", anchorEl);
  return (
    <>
      <div>
        <FormControl fullWidth>
          <TextField
            onChange={(e) => {
              setAnchorEl(e.currentTarget);
              setValue(e.target.value);
            }}
            value={value}
            id="outlined-error-helper-text2"
            label="Enter Emp Name"
          />
        </FormControl>
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={!hideSuggestions && Boolean(anchorEl)}
            style={{ height: "50vh", top: "7vh" }}
            onClose={() => {
              setHideSuggestions(true);
              setAnchorEl(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "100px",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "100px",
              horizontal: "left",
            }}
          >
            {suggestions.map((suggestion) => (
              <MenuItem onClick={() => findResult(suggestion)}>
                {suggestion}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
