import ingredientsReducer, { IIngredientsState } from './slice';

import { buns } from '../../../testData';
import { fetchIngredientsThunk } from './actions';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем fetchIngredientsThunk', () => {
    test('тестируем отправку запроса (pending)', async () => {
      const initialState: IIngredientsState = {
        ingredients: [],
        isLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        fetchIngredientsThunk.pending('pending')
      );

      expect(newState.isLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('тестируем ошибку при запросе (rejected)', async () => {
      const initialState: IIngredientsState = {
        ingredients: [],
        isLoading: false,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выгрузки ингредиентов'
      };
      const newState = ingredientsReducer(
        initialState,
        fetchIngredientsThunk.rejected(error, 'rejected')
      );

      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('тестируем успешный запрос (fulfilled)', async () => {
      const initialState: IIngredientsState = {
        ingredients: [],
        isLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        fetchIngredientsThunk.fulfilled(buns, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(buns);
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
