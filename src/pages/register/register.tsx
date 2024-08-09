import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { registerUserThunk } from '../../services/authentication/actions';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      return;
    }
    dispatch(
      registerUserThunk({
        name: userName,
        email: email,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
