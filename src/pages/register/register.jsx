import { setUser } from '@/services/redux/user/slice';
import { registerRequest } from '@/utils/api';
import { setAuthTokens } from '@/utils/auth-tokens';
import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

export const Register = () => {
  const [data, setData] = useState({ email: '', name: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerRequest(data);
      setAuthTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
      dispatch(setUser(res.user));
      navigate('/', { replace: true });
    } catch (error) {
      alert(error.data?.message || error.message || 'ошибка при регистрации');
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
      <section className={styles.login_header}>
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
