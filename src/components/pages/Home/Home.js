import React, { useState } from "react";
import "./Home.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MeasurmentsOfSelectedCity from "./MeasurmentsOfSelectedCity.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../../redux/slices/allCities";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const allCity = useSelector((store) => store.getAllCities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCities());
  }, []);
  const handleChange = (e) => {
    setSelectedCity(e.target.value);
    navigate("/city/" + e.target.value);
  };
  if (allCity?.isLoading) {
    return <h3>Data Loading....</h3>;
  }
  if (allCity.isError && allCity?.isLoading === false) {
    return <h3>Error In Data Fetching</h3>;
  }
  return (
    <div className="main-container">
      <h4>Select City In Order to get Measurements Of Pollutants</h4>
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
            {allCity?.allCities?.length !== 0 &&
              allCity?.allCities?.map(
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

      <MeasurmentsOfSelectedCity
      // selectedCity={selectedCity !== "" && selectedCity}
      />
    </div>
  );
};

export default Home;
