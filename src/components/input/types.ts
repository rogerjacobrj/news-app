export interface TextInputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  source: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
