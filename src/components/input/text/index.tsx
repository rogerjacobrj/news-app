import { TextInputProps } from '../types';
import styles from './styles.module.scss';

const TextInput = (props: TextInputProps) => {
  const { placeholder, value, onChange } = props;

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.textInput}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
