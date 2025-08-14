import { resetPasswordRequest } from '@/utils/api';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

export const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = localStorage.getItem('resetAllowed');
    if (allowed !== 'true') {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const [data, setData] = useState({ newPassword: '', code: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword && data.code) {
      try {
        const res = await resetPasswordRequest({
          password: data.newPassword,
          token: data.code,
        });
        if (res.success) {
          localStorage.removeItem('resetAllowed');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      <form onSubmit={handleSubmit} className={styles.container}>
        <PasswordInput
          name="newPassword"
          value={data.newPassword}
          type="password"
          placeholder="Введите новый пароль"
          onChange={handleChange}
        />
        <Input
          name="code"
          type="text"
          value={data.code}
          placeholder="Введите код из письма"
          onChange={handleChange}
        />

        <div className={styles.button}>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            type="primary"
          >
            Сохранить
          </Button>
        </div>
      </form>
      <section className={styles.login_header}>
        <span className={styles.page_header_text}>Вспомнили пароль?</span>
        <Link to="/login">
          <Button extraClass={styles.link_text} size="medium" type="secondary">
            Войти
          </Button>
        </Link>
      </section>
    </div>
  );
};
