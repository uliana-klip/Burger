import { useAppDispatch } from '@/services/redux/hooks';
import { setUser } from '@/services/redux/user/slice';
import { registerRequest } from '@/utils/api';
import { setAuthTokens } from '@/utils/auth-tokens';
import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { ChangeEvent, FormEvent } from 'react';

import styles from '../pages.module.css';

export const Register = (): React.JSX.Element | null => {
  const [data, setData] = useState({ email: '', name: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await registerRequest(data);
      setAuthTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
      dispatch(setUser(res.user));
      navigate('/', { replace: true });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        const err = error as { message?: string; data?: { message?: string } };
        alert(err.data?.message || err.message || 'ошибка при регистрации');
      } else {
        alert('ошибка при регистрации');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ margin: '0' }} className={styles.container}>
        <Input
          name="name"
          onChange={handleChange}
          placeholder="Имя"
          size="default"
          type="text"
          value={data.name}
        />
        <Input
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
          size="default"
          type="email"
          value={data.email}
        />
        <PasswordInput name="password" value={data.password} onChange={handleChange} />
        <div className={styles.button}>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <section>
        <span className={styles.page_header_text}>Уже зарегистрированы?</span>
        <Link to="/login">
          <Button
            extraClass={styles.link_text}
            size="medium"
            type="secondary"
            htmlType="button"
          >
            Войти
          </Button>
        </Link>
      </section>
    </div>
  );
};
