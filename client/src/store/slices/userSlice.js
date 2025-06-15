import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_BASE } from "@/lib/env";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${USER_BASE}/${userId}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${USER_BASE}/${userId}`, userData, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update user";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  updating: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
