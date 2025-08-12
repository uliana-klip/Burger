import { setUser } from '@/services/redux/user/slice';
import { updateUserRequest } from '@/utils/api';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';

export const ProfileForm = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [dataForm, setDataForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (user) {
      setDataForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);
  if (!user) {
    return <Preloader />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((dataForm) => ({ ...dataForm, [name]: value }));
  };

  const cancelEdit = () => {
    setDataForm({ name: user.name, email: user.email, password: '' });
    console.log('all cancel');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUserRequest(dataForm);
      dispatch(setUser(res.user));
      setDataForm({ name: res.user.name, email: res.user.email, password: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.profile_form}>
      <Input
        name="name"
        value={dataForm.name}
        type="text"
        icon="EditIcon"
        placeholder="Имя"
        extraClass={`${styles.input_icon} ${styles.profile_form_input}`}
        onChange={handleChange}
      />
      <EmailInput
        name="email"
        type="email"
        icon="EditIcon"
        placeholder="Логин"
        value={dataForm.email}
        onChange={handleChange}
      />
      <PasswordInput onChange={handleChange} name="password" value={dataForm.password} />
      {dataForm.email !== user.email ||
      dataForm.name !== user.name ||
      (dataForm.password !== '' && dataForm.password.length >= 6) ? (
        <section className={styles.buttons}>
          <Button
            onClick={cancelEdit}
            extraClass={styles.link_text}
            size="medium"
            type="secondary"
          >
            Отмена
          </Button>
          <Button
            style={{ padding: '20px 40px', fontSize: '20px' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </section>
      ) : (
        ''
      )}
    </form>
  );
};
