import { forgotPasswordRequest } from '@/utils/api';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { ChangeEvent, FormEvent } from 'react';

import styles from '../pages.module.css';

export const ForgotPassword = (): React.JSX.Element | null => {
  useEffect(() => {
    localStorage.removeItem('resetAllowed');
  }, []);

  const navigate = useNavigate();

  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const [data, setData] = useState({ email: '' });
  const isValid = emailRegex.test(data.email);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (!isValid || data.email === '') return;
      const res = await forgotPasswordRequest(data);
      if (res.success) {
        localStorage.setItem('resetAllowed', 'true');
        navigate('/reset-password', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      <form onSubmit={handleSubmit} className={styles.container_form}>
        <EmailInput
          name="email"
          value={data.email}
          placeholder="Укажите e-mail"
          onChange={handleChange}
          checkValid={() => isValid}
          errorText="неверный формат"
        />

        <div className={styles.button}>
          <Button
            disabled={!isValid || data.email === ''}
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
