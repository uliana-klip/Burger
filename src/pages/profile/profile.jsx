import { logoutUser, setAuthChecked, setUser } from '@/services/redux/user/slice';
import { updateUserRequest } from '@/utils/api';
import { setCookie } from '@/utils/cookie';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './profile.module.css';

export const Profile = () => {
  const { email, name } = useSelector((state) => state.user.user);
  const [dataForm, setDataForm] = useState({
    name,
    email,
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((dataForm) => ({ ...dataForm, [name]: value }));
  };

  const cancelEdit = () => {
    setDataForm({
      name,
      email,
      password: '',
    });
    console.log('all cancel');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('отмена перезагрузки');
    try {
      const res = await updateUserRequest(dataForm);
      //console.log(res);
      dispatch(setUser(res.user));
      //console.log(email, name);
      setDataForm({ name: res.user.name, email: res.user.email, password: '' });
      //console.log(dataForm);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setAuthChecked(false));
    setCookie('token', '', { 'max-age': -1 });
    navigate('/login');
  };

  return (
    <div className={styles.profile}>
      <section>
        <nav className={styles.profile_left_nav}>
          <button className={styles.navigation}>Профиль</button>
          <button className={styles.navigation}>История заказов</button>
          <button className={styles.navigation} onClick={handleLogout}>
            Выход
          </button>
        </nav>
        <p>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </section>
      <form onSubmit={handleSubmit} className={styles.profile_right}>
        <Input
          name="name"
          value={dataForm.name}
          type="text"
          icon="EditIcon"
          placeholder="Имя"
          extraClass={styles.input_icon}
          onChange={handleChange}
          onIconClick={() => {
            console.log('cursor');
          }}
        />
        <EmailInput
          name="email"
          type="email"
          icon="EditIcon"
          placeholder="Логин"
          value={dataForm.email}
          onChange={handleChange}
        />
        <PasswordInput
          onChange={handleChange}
          name="password"
          value={dataForm.password}
        />
        {dataForm.email !== email ||
        dataForm.name !== name ||
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
    </div>
  );
};
