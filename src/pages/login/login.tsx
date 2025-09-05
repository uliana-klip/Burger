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

import type { ChangeEvent, FormEvent } from 'react';

import styles from '../pages.module.css';

export const Login = (): React.JSX.Element | null => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await loginRequest(data);
      const from = location.state?.from?.pathname;
      setAuthTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      dispatch(setUser(res.user));
      navigate(from || '/', { replace: true });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        const err = error as { message?: string; data?: { message?: string } };
        alert(err.data?.message || err.message || 'Ошибка при входе');
      } else {
        alert('Ошибка при входе');
      }
    }
  };
  return (
    <div className={styles.container}>
      <form style={{ margin: '0' }} className={styles.container} onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <EmailInput
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
          size="default"
          value={data.email}
        />
        <PasswordInput onChange={handleChange} name="password" value={data.password} />
        <div className={styles.button}>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            htmlType="submit"
            type="primary"
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
            type="secondary"
            htmlType="button"
          >
            Зарегистрироваться
          </Button>
        </Link>
        <span className={styles.page_header_text}>Забыли пароль?</span>
        <Link to="/forgot-password">
          <Button
            style={{ padding: '8px 10px' }}
            size="medium"
            type="secondary"
            htmlType="button"
          >
            Восстановить пароль
          </Button>
        </Link>
      </section>
    </div>
  );
};
