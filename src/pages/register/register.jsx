import { registerRequest } from '@/utils/api';
import { setCookie } from '@/utils/cookie';
import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

// import styles from './NAMEPAGE.module.css';

export const Register = () => {
  const [data, setData] = useState({ email: '', name: '', password: '' });
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerRequest(data);
    setCookie('token', res.accessToken.slice(7));
    setUser(res.user);
    navigate('/login');
    console.log(user);
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ margin: '0' }} className={styles.container}>
        <Input
          ref={{
            current: '[Circular]',
          }}
          errorText="Ошибка"
          name="name"
          onChange={handleChange}
          // onIconClick={function fee() {}}
          placeholder="Имя"
          size="default"
          type="text"
          value={data.name}
        />
        <Input
          name="email"
          onChange={handleChange}
          // onIconClick={function fee() {}}
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
            type="primary" /*onClick={function fee() {}}*/
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
            type="secondary" /*onClick={function fee() {}}*/
          >
            Войти
          </Button>
        </Link>
      </section>
    </div>
  );
};
