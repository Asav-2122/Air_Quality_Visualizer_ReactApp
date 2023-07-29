import { configureStore } from "@reduxjs/toolkit";
import allCities from "../slices/allCities";

export const store = configureStore({
  reducer: {
    getAllCities: allCities,
  },
});
