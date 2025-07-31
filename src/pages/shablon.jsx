import {
  PasswordInput,
  Button,
  Input,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './pages.module.css';
// import styles from './NAMEPAGE.module.css';

export const COMPONENT = () => {
  return (
    <div className={styles.container}>
      <h2>ЗАГОЛОВОК</h2>

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
          Войти
        </Button>
      </div>
      <section className={styles.login_header}>
        <span>Вы — новый пользователь?</span>
        <Button
          style={{ padding: '0 10px' }}
          size="medium"
          type="secondary" /*onClick={function fee() {}}*/
        >
          Зарегистрироваться
        </Button>
      </section>
    </div>
  );
};
