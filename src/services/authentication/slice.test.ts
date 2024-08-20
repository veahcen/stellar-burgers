import { authSlice, setUser, setIsAuthChecked, initialState } from './slice';
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './actions';
import { TUser } from '@utils-types';

const testUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('authSlice', () => {
  it('должно вернуть начальное состояние', () => {
    expect(authSlice.reducer(undefined, { type: 'undefined' })).toEqual(
      initialState
    );
  });

  it('должно установить пользователя при вызове setUser', () => {
    const nextState = authSlice.reducer(initialState, setUser(testUser));
    expect(nextState.user).toEqual(testUser);
  });

  it('должно установить isAuthChecked при вызове setIsAuthChecked', () => {
    const nextState = authSlice.reducer(initialState, setIsAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });

  describe('extraReducers', () => {
    it('должно сбросить ошибку при registerUserThunk.pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe(null);
    });

    it('должно установить пользователя и isAuthChecked при registerUserThunk.fulfilled', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить ошибку и isAuthChecked при registerUserThunk.rejected', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить пользователя и isAuthChecked при loginUserThunk.fulfilled', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно установить ошибку и isAuthChecked при loginUserThunk.rejected', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = authSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('должно очистить пользователя при logoutUserThunk.fulfilled', () => {
      const action = { type: logoutUserThunk.fulfilled.type };
      const nextState = authSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toBe(null);
    });

    it('должно обновить пользователя при updateUserThunk.fulfilled', () => {
      const updatedUser = { ...testUser, name: 'Updated User' };
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: { user: updatedUser }
      };
      const nextState = authSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toEqual(updatedUser);
    });
  });
});
