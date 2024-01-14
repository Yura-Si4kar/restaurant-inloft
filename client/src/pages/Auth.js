import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../config/consts';
import MyInput from '../components/UI/MyInput/MyInput';
import MyButton from '../components/UI/MyButton/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../store/actions/servicesActions';
import { Box, Container, Typography } from '@mui/material';
import { authorization, registration } from '../http/userApi';
import { selectIsLoading } from '../store/selectors/selectors';
import Loading from '../components/Loading';

export default function Auth() {
  const loading = useSelector(selectIsLoading);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;

    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }

    if (isLogin) {
      try {
        user = await authorization(email, password);
        dispatch(setUser(user));
        dispatch(setIsAuth(true));
        navigate(HOME_ROUTE);
      } catch (error) {
        alert(error.response.data.message);
        console.error(error.message);
        setError(error.message);
      }
    } else {
      if (!email || !password || !repeatPassword) {
        setError('Please fill out all the fields.');
        return;
      }

      if (password !== repeatPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        user = await registration(email, password);
        dispatch(setUser(user));
        dispatch(setIsAuth(true));
        navigate(HOME_ROUTE);
      } catch (error) {
        alert(error.response.data.message);
        console.error(error.message);
        dispatch(setIsAuth(false));
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <Container className="auth-container">
      <Box className="auth-card">
        <Typography variant="h4" className="auth-title">
          {isLogin ? 'Авторизація' : 'Реєстрація'}
        </Typography>
        <form className="auth-form">
          <MyInput
            className="auth-input"
            placeholder="Введіть ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyInput
            className="auth-input"
            placeholder="Введіть ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin && (
            <MyInput
              className="auth-input"
              placeholder="Повторіть ваш пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
            />
          )}
        </form>
        {error && (
          <Typography className="auth-alert" variant="paragraph">
            {error}
          </Typography>
        )}
        <Box className="auth-links">
          {isLogin ? (
            <Typography variant="span" className="auth-link">
              Немає аккаунта?{' '}
              <Link to={AUTHORIZATION_ROUTE}>Зареєструйся!</Link>
            </Typography>
          ) : (
            <Typography variant="span" className="auth-link">
              Уже зареєстровані? <Link to={LOGIN_ROUTE}>Увійдіть!</Link>
            </Typography>
          )}
        </Box>
        <MyButton
          variant="contained"
          color="success"
          type="submit"
          onClick={handleSubmit}
          className="auth-submit"
        >
          {isLogin ? 'Увійти' : 'Реєстрація'}
        </MyButton>
      </Box>
    </Container>
  );
}
