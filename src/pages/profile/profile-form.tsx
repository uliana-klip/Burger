import { InputName } from '@/components/input-name';
import { setUser } from '@/services/redux/user/slice';
import { updateUserRequest } from '@/utils/api';
import {
  Button,
  EmailInput,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { ChangeEvent, FormEvent } from 'react';

import styles from './profile.module.css';

type TUserInfo = {
  name: string;
  email: string;
};

type TState = {
  user: { user: TUserInfo | null };
};

export const ProfileForm = (): React.JSX.Element | null => {
  const user = useSelector((state: TState) => state.user.user);
  const dispatch = useDispatch();

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
