import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_BASE } from "@/lib/env";
import axios from "axios";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const verifyRes = await axios.get(`${AUTH_BASE}/verify`, {
        withCredentials: true,
      });

      const userId = verifyRes.data.data.userId;
      const role = verifyRes.data.data.role;
      const data = { userId, role };

      return data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Please log in to access the dashboard!";
      return rejectWithValue(message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (signUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE}/sign-up`, signUpData, {
        withCredentials: true,
      });

      return response.data.data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to sign up";
      return rejectWithValue(message);
    }
  }
);

export const signUpUserByAdmin = createAsyncThunk(
  "auth/signUpUserByAdmin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE}/sign-up-user`, userData, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to sign up user";
      return rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (signInData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE}/sign-in`, signInData, {
        withCredentials: true,
      });

      return response.data.data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to sign in";
      return rejectWithValue(message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE}/sign-out`, null, {
        withCredentials: true,
      });

      return response.data.message;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to sign out";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  checkingAuth: false,
  creatingUser: false,
  createdUser: null,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
        state.authError = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.authError = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkingAuth = false;
        state.user = null;
        state.isLoggedIn = false;
        state.authError = action.payload;
      })

      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signUpUserByAdmin.pending, (state) => {
        state.creatingUser = true;
        state.error = null;
      })
      .addCase(signUpUserByAdmin.fulfilled, (state, action) => {
        state.creatingUser = false;
        state.createdUser = action.payload;
      })
      .addCase(signUpUserByAdmin.rejected, (state, action) => {
        state.creatingUser = false;
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
