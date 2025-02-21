import { Category, Author } from '../../types';

export interface FilterSectionProps {
  authors?: Author[];
  categories: Category[];
  source: string;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
