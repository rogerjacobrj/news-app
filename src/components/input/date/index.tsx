import DatePicker from 'react-datepicker';
import { DateInputProps } from '../types';
import styles from './styles.module.scss';

const DateInput = (props: DateInputProps) => {
  const { label, value, onDateChange, entity } = props;

  return (
    <div className={styles.dateSection}>
      <label>{label}</label>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        isClearable
        className={styles.dateInput}
        selected={value}
        onChange={(date) => onDateChange(entity, date!)}
      />
    </div>
  );
};

export default DateInput;
