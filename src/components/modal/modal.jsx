import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { ModalOverlay } from './modal-overlay';

import styles from '../modal/modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose, title }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(-1);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <ModalOverlay onClick={handleClose} />
      <div className={styles.window}>
        <section
          className={`${styles.modal_header} ${title ? styles.modal_header_c : styles.modal_header_r}`}
        >
          {title && <span className={styles.title}>{title}</span>}
          <CloseIcon onClick={handleClose} className={styles.close_icon} />
        </section>
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};
