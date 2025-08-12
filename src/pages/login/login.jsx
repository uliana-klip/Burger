import { setUser } from '@/services/redux/user/slice';
import { loginRequest } from '@/utils/api';
import { setAuthTokens } from '@/utils/auth-tokens';
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

export const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginRequest(data);
      console.log('user:', res.user);
      const from = location.state?.from?.pathname;
      setAuthTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      dispatch(setUser(res.user));
      navigate(from || '/', { replace: true });
    } catch (error) {
      alert(error.data?.message || error.message || 'Ошибка при входе');
      setData((data) => ({ ...data, password: '' }));
    }
  };
  return (
    <div className={styles.container}>
      <form style={{ margin: '0' }} className={styles.container} onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <EmailInput
          name="email"
          onChange={handleChange}
          // onIconClick={function fee() {}}
          placeholder="E-mail"
          size="default"
          type="email"
          value={data.email}
        />
        <PasswordInput onChange={handleChange} name="password" value={data.password} />
        <div className={styles.button}>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            htmlType="submit"
            type="primary" /*onClick={function fee() {}}*/
          >
            Войти
          </Button>
        </div>
      </form>
      <section className={styles.page_header}>
        <span className={styles.page_header_text}>Вы — новый пользователь?</span>
        <Link to="/register">
          <Button
            extraClass={styles.link_text}
            size="medium"
            type="secondary" /*onClick={function fee() {}}*/
          >
            Зарегистрироваться
          </Button>
        </Link>
        <span className={styles.page_header_text}>Забыли пароль?</span>
        <Link to="/forgot-password">
          <Button
            style={{ padding: '8px 10px' }}
            size="medium"
            type="secondary" /*onClick={function fee() {}}*/
          >
            Восстановить пароль
          </Button>
        </Link>
      </section>
    </div>
  );
};
