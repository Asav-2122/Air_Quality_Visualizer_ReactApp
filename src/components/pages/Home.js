import React, { useState } from "react";
import "./Home.css";
import { useFetch } from "../../custom-hooks/useFetch";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const { isLoading, apiData:allCity ,serverError } = useFetch(
    "https://api.openaq.org/v2/cities?limit=100"
  );
  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };
  if (isLoading) {
    return <h3>Data Loading....</h3>;
  }
  if (serverError && isLoading === false) {
    return <h3>Error In Data Fetching</h3>;
  }
  return (
    <div className="main-container">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="City"
            onChange={handleChange}
          >
            {allCity?.length !== 0 &&
              allCity.map(
                (ele, index) =>
                  ele?.city?.match(/^[a-zA-Z]+$/) && (
                    <MenuItem key={index} value={ele?.city}>
                      {ele?.city}
                    </MenuItem>
                  )
              )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Home;
