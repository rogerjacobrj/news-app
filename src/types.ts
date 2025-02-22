export interface Article {
  id: string;
  category?: string;
  date?: string;
  title: string;
  url?: string;
  author?: string;
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface ParamProps {
  source: string;
  page: number;
  size: number;
  sortBy: SelectOption;
  query: string;
  startDate: Date | null;
  endDate: Date | null;
  dateRange: DateRange | null;
  selectedCategories: string[];
}
