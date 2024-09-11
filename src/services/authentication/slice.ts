import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './actions';

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null | undefined;
}

export const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      });

    builder
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });

    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    UserSelector: (state) => state.user,
    AuthCheckedSelector: (state) => state.isAuthChecked,
    UserNameSelector: (state) => state.user?.name
  }
});

export const { UserSelector, AuthCheckedSelector, UserNameSelector } =
  authSlice.selectors;

export const { setUser, setIsAuthChecked } = authSlice.actions;
