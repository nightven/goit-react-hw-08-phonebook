import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { logOut, logIn, refreshUser, signup } from './operations';
import storage from 'redux-persist/lib/storage';

const initialAuthState = {
  user: { name: null, email: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
};

const getActions = type => isAnyOf(signup[type], logIn[type], logOut[type], refreshUser[type]);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoggedIn = false;
        state.isRefreshing = true;
      })
      .addMatcher(getActions('rejected'), state => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = true;
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
        state.isRefreshing = false;
      });
  },
  
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const persistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
