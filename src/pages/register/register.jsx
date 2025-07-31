import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';

import styles from '../pages.module.css';
// import styles from './NAMEPAGE.module.css';

export const Register = () => {
  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <Input
        ref={{
          current: '[Circular]',
        }}
        errorText="Ошибка"
        name="name"
        // onChange={function fee() {}}
        // onIconClick={function fee() {}}
        placeholder="Имя"
        size="default"
        type="text"
        // value="value"
      />
      <Input
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
          Зарегистрироваться
        </Button>
      </div>
      <section className={styles.login_header}>
        <span className={styles.page_header_text}>Уже зарегистрированы?</span>
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
