import { Button, InfoIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './not-found-404.module.css';

export const Page404 = () => {
  return (
    <div className={styles.page404}>
      <InfoIcon className={styles.icon} />
      <span className={styles.page404_title}>
        Кажется такой <br />
        страницы нет...
      </span>
      <Link to="/">
        <Button htmlType="button">Вернуться на главную</Button>
      </Link>
    </div>
  );
};
