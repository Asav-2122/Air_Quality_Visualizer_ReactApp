import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCities = createAsyncThunk("getAllCities", async () => {
  try {
    let data = await fetch("https://api.openaq.org/v2/cities?limit=100");
    let response = await data.json();
    return response?.results;
  } catch (error) {
    console.log(error);
  }
});
const allCities = createSlice({
  name: "allCity",
  initialState: {
    allCities: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allCities = action.payload;
    });
    builder.addCase(getAllCities.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allCities.reducer;
