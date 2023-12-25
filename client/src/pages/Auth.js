import React, { useState } from 'react';
import { Alert, Card, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../config/consts';
import { createUser, signInUser } from '../firebase/firebase';
import { startSession } from '../firebase/session';
import MyInput from '../components/UI/MyInput/MyInput';
import MyButton from '../components/UI/MyButton/MyButton';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../store/actions/servicesActions';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (isLogin) {
      try {
        const data = await signInUser(email, password);
        startSession(data.user);
        dispatch(setUser(data.user));
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
        let data = await createUser(email, password);
        startSession(data.user);
        dispatch(setUser(data.user));
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

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        {error && <Alert variant={'danger'}>{error}</Alert>}
        <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form className="d-flex flex-column">
          <MyInput
            className="mt-3"
            placeholder="Введіть ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyInput
            className="mt-3"
            placeholder="Введіть ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin ? (
            <MyInput
              className="mt-3"
              placeholder="Повторіть ваш пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
            />
          ) : null}
        </Form>
        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {isLogin ? (
            <Form.Text>
              Немає аккаунта?{' '}
              <Link to={AUTHORIZATION_ROUTE}>Зареєструйся!</Link>
            </Form.Text>
          ) : (
            <Form.Text>
              Уже зареєстровані? <Link to={LOGIN_ROUTE}>Увійдіть!</Link>
            </Form.Text>
          )}
          <MyButton
            variant="contained"
            color="success"
            className="mt-3"
            type="submit"
            onClick={submit}
          >
            {isLogin ? 'Увійти' : 'Реєстрація'}
          </MyButton>
        </Row>
      </Card>
    </Container>
  );
}
