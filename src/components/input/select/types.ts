import { SingleValue, ActionMeta } from 'react-select';
import { SelectOption } from '../../../types';
export interface SelectInputProps {
  options: SelectOption[];
  onChange: (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void;
  selectedValue?: SelectOption;
  showLabel: boolean;
  selectedOption?: SingleValue<SelectOption>;
  label: string;
}
