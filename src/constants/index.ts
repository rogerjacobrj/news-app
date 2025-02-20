export const API_URL: string = import.meta.env.VITE_API_URL;

interface SortOption {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'relevant', label: 'Relevant' },
];
