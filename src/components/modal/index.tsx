import { ReactNode, useEffect } from 'react';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  resetPreference: () => void;
  title: string;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, onSave, title, children, resetPreference } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }

    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <div>
            <button className={styles.resetButton} onClick={resetPreference}>
              Reset
            </button>
          </div>
          <div>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
