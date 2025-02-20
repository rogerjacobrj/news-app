interface SelectOption {
  label: string;
  value: string;
}

export interface SelectInputProps {
  options: SelectOption[];
  onChange?: (item: SelectOption) => void;
  selectedOption?: string;
  showLabel: boolean;
  label: string;
}
