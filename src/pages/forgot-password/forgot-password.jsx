import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from '../pages.module.css';

// import styles from './NAMEPAGE.module.css';

export const ForgotPassword = () => {
  const [stepPasswodr, setStepPassword] = useState(1);
  function onClick() {
    if (stepPasswodr === 1) {
      setStepPassword(2);
    }
  }
  console.log(stepPasswodr);
  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      {stepPasswodr === 1 ? (
        <Input
          name="name"
          type="text"
          //value=""
          placeholder="Укажите e-mail" /*onChange={function fee() {}}*/
        />
      ) : (
        <>
          <PasswordInput
            name="password"
            // value=""
            type="password"
            placeholder="Введите новый пароль" /*onChange={function fee() {}}*/
          />
          <Input
            name="code"
            type="text"
            //value=""
            placeholder="Введите код из письма" /*onChange={function fee() {}}*/
          />
        </>
      )}

      <div className={styles.button}>
        <Button
          style={{ padding: '20px 40px', fontSize: '20px' }}
          size="large"
          type="primary"
          onClick={onClick}
        >
          {stepPasswodr === 1 ? 'Восстановить' : 'Сохранить'}
        </Button>
      </div>
      <section className={styles.login_header}>
        <span className={styles.page_header_text}>Вспомнили пароль?</span>
        <Button
          style={{ padding: '0 10px' }}
          size="medium"
          type="secondary" /*onClick={function fee() {}}*/
        >
          Войти
        </Button>
      </section>
    </div>
  );
};
