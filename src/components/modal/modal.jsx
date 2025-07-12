import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDom from 'react-dom';

import styles from '../modal/modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <div className={styles.backdrop} onClick={() => onClose?.()} />
      <div className={styles.window}>{children}</div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};
