import { resetPasswordRequest } from '@/utils/api';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { ChangeEvent, FormEvent } from 'react';

import styles from '../pages.module.css';

export const ResetPassword = (): React.JSX.Element | null => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = localStorage.getItem('resetAllowed');
    if (allowed !== 'true') {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const [data, setData] = useState({ newPassword: '', code: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
            htmlType="submit"
          >
            Сохранить
          </Button>
        </div>
      </form>
      <section>
        <span className={styles.page_header_text}>Вспомнили пароль?</span>
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
