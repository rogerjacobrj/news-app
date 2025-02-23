import { ButtonProps } from './types';
import styles from './styles.module.scss';

const Button = (props: ButtonProps) => {
  const { label, customClass, onClick } = props;

  return (
    <button className={[styles.customButton, customClass].join(' ')} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
