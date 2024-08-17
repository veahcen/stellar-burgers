import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/authentication/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk())
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
