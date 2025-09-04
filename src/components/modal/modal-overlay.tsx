import type React from 'react';

import styles from './modal.module.css';
type TModalOverlay = {
  onClick: () => void;
};

export const ModalOverlay = ({ onClick }: TModalOverlay): React.JSX.Element | null => (
  <div className={styles.backdrop} onClick={onClick} />
);
