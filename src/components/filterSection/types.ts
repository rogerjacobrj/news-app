import { Category, Author } from '../../types';

export interface FilterSectionProps {
  authors?: Author[];
  categories: Category[];
  source: string;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckBoxChange: (value: string) => void;
  onDateChange: (entity: string, date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  clearDateFilter: () => void;
  selectedCategories: string[];
}
