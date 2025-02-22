import { CheckboxProps } from '../types';

const Checkbox = (props: CheckboxProps) => {
  const { label, value, onChange, checked } = props;

  return (
    <div>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => {
          onChange(value);
        }}
      />{' '}
      {label}
    </div>
  );
};

export default Checkbox;
