export const API_URL: string = import.meta.env.VITE_API_URL;

export interface SortOption {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'relevance', label: 'Relevance' },
];

export const sources: SortOption[] = [
  {
    label: 'Guardian',
    value: 'guardian',
  },
  {
    label: 'New York Times',
    value: 'newyork_times',
  },
  {
    label: 'News API',
    value: 'news_api',
  },
];
