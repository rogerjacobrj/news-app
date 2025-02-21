import { CheckboxProps } from '../types';

const Checkbox = (props: CheckboxProps) => {
  const { label, value, onChange } = props;

  return (
    <div>
      <input
        type="checkbox"
        value={value}
        onChange={() => {
          onChange(value);
        }}
      />{' '}
      {label}
    </div>
  );
};

export default Checkbox;
