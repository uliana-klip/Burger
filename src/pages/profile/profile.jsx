import { Input } from '@krgaa/react-developer-burger-ui-components';

//import styles from '../pages.module.css';
import styles from './profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <section>
        <section className={styles.profile_left_nav}>
          <h2>Профиль</h2>
          <h2>История заказов</h2>
          <h2>Выход</h2>
        </section>
        <p>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </section>
      <section className={styles.profile_right}>
        <Input
          ref={{
            current: '[Circular]',
          }}
          icon="EditIcon"
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
          icon="EditIcon"
          errorText="Ошибка"
          name="name"
          // onChange={function fee() {}}
          // onIconClick={function fee() {}}
          placeholder="Логин"
          size="default"
          type="text"

          // value="value"
        />
        <Input
          name="password"
          icon="EditIcon"
          placeholder="Пароль"
          type="password"
          /*value="password" /*onChange={function fee() {}}*/
        />
      </section>
    </div>
  );
};
