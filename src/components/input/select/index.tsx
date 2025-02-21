import Select, { StylesConfig } from 'react-select';
import { SelectInputProps } from './types';
import styles from './styles.module.scss';
import { SelectOption } from '../../../types';

const customStyles: StylesConfig<SelectOption, false> = {
  control: (provided) => ({
    ...provided,
    minWidth: '7.5rem',
    border: 'none',
    borderRadius: '0.375rem',
  }),
  menu: (provided) => ({
    ...provided,
    minWidth: '7.5rem',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#0e7cad' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: 'none',
    };
  },
};

const SelectInput = (props: SelectInputProps) => {
  const { showLabel, label, options, selectedOption, onChange } = props;

  return (
    <div className={styles.selectInputContainer}>
      {showLabel && <label>{label}</label>}
      <Select styles={customStyles} options={options} value={selectedOption} onChange={onChange} />
    </div>
  );
};

export default SelectInput;
