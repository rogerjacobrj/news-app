import { TextInputProps } from '../types';
import styles from './styles.module.scss';

const TextInput = (props: TextInputProps) => {
  const { placeholder } = props;

  return <input type="text" placeholder={placeholder} className={styles.textInput} />;
};

export default TextInput;
