import styles from './modal.module.css';

export const ModalOverlay = ({ onClick }) => {
  return <div className={styles.backdrop} onClick={onClick} />;
};

import PropTypes from 'prop-types';

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
