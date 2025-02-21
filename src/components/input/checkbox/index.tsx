import { CheckboxProps } from '../types';

const Checkbox = (props: CheckboxProps) => {
  const { label } = props;

  return (
    <div>
      <input type="checkbox" /> {label}
    </div>
  );
};

export default Checkbox;
