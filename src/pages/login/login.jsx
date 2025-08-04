import { loginRequest } from '@/utils/api';
import { getCookie, setCookie } from '@/utils/cookie';
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

// import styles from './login.module.css';

export const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginRequest(data);
    setCookie('token', res.accessToken.slice(7));
    const token = getCookie('token');
    navigate('/');

    console.log(token);
  };
  return (
    <div className={styles.container}>
      <form style={{ margin: '0' }} className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles}>Вход</h2>
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
