import ReactDom from 'react-dom';

import styles from '../modal/modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.window}>{children}</div>
    </>,
    modalRoot
  );
}
