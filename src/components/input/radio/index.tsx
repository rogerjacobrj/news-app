import { RadioButtonProps } from '../types';

const RadioInput = (props: RadioButtonProps) => {
  const { label, value, source, onChange } = props;

  return (
    <div>
      <input type="radio" value={value} checked={source === value} onChange={onChange} />
      &nbsp;{label}
    </div>
  );
};

export default RadioInput;
