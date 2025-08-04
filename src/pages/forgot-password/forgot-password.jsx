import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../pages.module.css';

// import styles from './NAMEPAGE.module.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  function onClick() {
    localStorage.setItem('resetAllowed', 'true');
    navigate('/reset-password');
    console.log('yes');
  }

  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>

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
          onClick={onClick}
        >
          Восстановить
        </Button>
      </div>
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
