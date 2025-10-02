import { InputName } from '@/components/input-name';
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks';
import { setUser } from '@/services/redux/user/slice';
import { updateUserRequest } from '@/utils/api';
import {
  Button,
  EmailInput,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import type { TUserData } from '@/types';
import type { ChangeEvent, FormEvent } from 'react';

import styles from './profile.module.css';

export const ProfileForm = (): React.JSX.Element | null => {
  const user = useAppSelector((state) => state.user.user) as TUserData | null;
  const dispatch = useAppDispatch();

  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataForm((dataForm) => ({ ...dataForm, [name]: value }));
  };

  const cancelEdit = (): void => {
    setDataForm({ name: user.name, email: user.email, password: '' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
      <InputName
        isIcon
        name="name"
        value={dataForm.name}
        placeholder="Имя"
        extraClass={styles.input_icon}
        onChange={handleChange}
      />
      <EmailInput
        isIcon
        name="email"
        placeholder="Логин"
        value={dataForm.email}
        onChange={handleChange}
      />
      <PasswordInput onChange={handleChange} name="password" value={dataForm.password} />
      {dataForm.email !== user.email ||
      dataForm.name !== user.name ||
      (dataForm.password !== '' && dataForm.password.length >= 6) ? (
        <section className={styles.buttons}>
          <Button onClick={cancelEdit} size="medium" type="secondary" htmlType="button">
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
