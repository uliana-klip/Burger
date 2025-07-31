import {
  PasswordInput,
  Button,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';

import styles from '../pages.module.css';
// import styles from './login.module.css';

export const Login = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles}>Вход</h2>
      <EmailInput
        ref={{
          current: '[Circular]',
        }}
        errorText="Ошибка"
        name="name"
        // onChange={function fee() {}}
        // onIconClick={function fee() {}}
        placeholder="E-mail"
        size="default"
        type="email"
        // value="value"
      />
      <PasswordInput name="password" value="password" /*onChange={function fee() {}}*/ />
      <div className={styles.button}>
        <Button
          style={{ padding: '20px 40px', fontSize: '20px' }}
          size="large"
          type="primary" /*onClick={function fee() {}}*/
        >
          Войти
        </Button>
      </div>
      <section className={styles.page_header}>
        <span className={styles.page_header_text}>Вы — новый пользователь?</span>
        <Button
          style={{ padding: '0 10px' }}
          size="medium"
          type="secondary" /*onClick={function fee() {}}*/
        >
          Зарегистрироваться
        </Button>
        <span className={styles.page_header_text}>Забыли пароль?</span>
        <Button
          style={{ padding: '8px 10px' }}
          size="medium"
          type="secondary" /*onClick={function fee() {}}*/
        >
          Восстановить пароль
        </Button>
      </section>
    </div>
  );
};
