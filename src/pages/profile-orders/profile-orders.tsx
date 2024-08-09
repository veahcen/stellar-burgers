import { ProfileOrdersUI } from '@ui-pages';
import { TOrder, TIngredient } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { profileOrdersSelector } from '../../services/order/slice';
import { getOrdersThunk } from '../../services/order/actions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(profileOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
