import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_BASE } from "@/lib/env";

export const getAdmin = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_BASE}/${userId}`, {
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

export const updateAdmin = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ADMIN_BASE}/${userId}`, userData, {
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

export const deleteAdmin = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_BASE}/${userId}`, {
        withCredentials: true,
      });
      return userId;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to delete user";
      return rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_BASE}/get-users`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to get users";
      return rejectWithValue(message);
    }
  }
);

export const updateUserByAdmin = createAsyncThunk(
  "admin/updateUserByAdmin",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_BASE}/update-user/${userId}`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update user";
      return rejectWithValue(message);
    }
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "admin/deleteUserByAdmin",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_BASE}/delete-user/${userId}`, {
        withCredentials: true,
      });
      return userId;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to delete user";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  data: null,
  users: [],
  loading: false,
  deleting: false,
  updating: false,
  usersLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearUserData(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAdmin.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.updating = false;
        state.data = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      .addCase(deleteAdmin.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state) => {
        state.deleting = false;
        state.data = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUserByAdmin.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.updating = false;
        const updatedUser = action.payload.user;

        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            ...updatedUser,
            student: action.payload.student || state.users[index].student,
          };
        }
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      .addCase(deleteUserByAdmin.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.deleting = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
