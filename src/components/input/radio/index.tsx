import { RadioButtonProps } from '../types';

const RadioInput = (props: RadioButtonProps) => {
  const { label, name, value, source, onChange } = props;

  return (
    <div>
      <input
        type="radio"
        value={value}
        name={name}
        checked={source === value}
        onChange={onChange}
      />
      &nbsp;{label}
    </div>
  );
};

export default RadioInput;
