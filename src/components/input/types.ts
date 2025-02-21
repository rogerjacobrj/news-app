export interface TextInputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
}

export interface CheckboxProps {
  label: string;
  value: string;
}
