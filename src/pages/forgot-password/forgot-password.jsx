import { forgotPasswordRequest } from '@/utils/api';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordRequest(data);
      if (res.success) {
        console.log(res);
        localStorage.setItem('resetAllowed', 'true');
        navigate('/reset-password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      <form onSubmit={handleSubmit} className={styles.container_form}>
        <Input
          name="email"
          type="email"
          value={data.email}
          placeholder="Укажите e-mail"
          onChange={handleChange}
        />

        <div className={styles.button}>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Восстановить
          </Button>
        </div>
      </form>
      <section>
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
