import { RadioButtonProps } from '../types';

const RadioInput = (props: RadioButtonProps) => {
  const { label, name, value } = props;

  return (
    <div>
      <input type="radio" value={value} name={name} /> {label}
    </div>
  );
};

export default RadioInput;
