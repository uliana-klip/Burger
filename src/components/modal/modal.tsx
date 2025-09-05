import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { ModalOverlay } from './modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals')!;

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export default function Modal({
  children,
  onClose,
  title,
}: TModalProps): React.ReactPortal {
  const navigate = useNavigate();

  const handleClose = (): void => {
    onClose();
    navigate(-1);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return (): void => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <ModalOverlay onClick={handleClose} />
      <div className={styles.window}>
        <section
          className={`${styles.modal_header} ${title ? styles.modal_header_c : styles.modal_header_r}`}
        >
          {title && <span className={styles.title}>{title}</span>}
          <CloseIcon
            type="secondary"
            onClick={handleClose}
            className={styles.close_icon}
          />
        </section>
        {children}
      </div>
    </>,
    modalRoot
  );
}
