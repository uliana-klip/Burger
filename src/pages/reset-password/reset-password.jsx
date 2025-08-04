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
  }, []);
  //временно
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  }

  function handleClick() {
    //временно
    if (
      data.password &&
      data.password.length >= 6 &&
      data.code &&
      data.code.length >= 4
    ) {
      navigate('/');
    } else {
      setIsError(true);
    }
  }
  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>

      <PasswordInput
        name="password"
        value={data.password}
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
      {isError && 'Введите данные'}
      <div className={styles.button}>
        <Button
          style={{ padding: '20px 40px', fontSize: '20px' }}
          size="large"
          type="primary"
          onClick={handleClick}
        >
          Сохранить
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
