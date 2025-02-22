import { SelectOption, DateRange } from '../types';

export const generateUrl = (
  source: string,
  page: number,
  size: number,
  sortBy: SelectOption,
  query: string,
  selectedCategories: string[],
  dateRange: DateRange | null,
) => {
  const queryParams = [];

  if (source) {
    queryParams.push(`source=${source}`);
  }

  if (query) {
    queryParams.push(`query=${query}`);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (size) {
    queryParams.push(`size=${size}`);
  }

  if (sortBy) {
    queryParams.push(`sort=${sortBy?.value}`);
  }

  if (selectedCategories?.length > 0 && (source === 'newyork_times' || source === 'guardian')) {
    queryParams.push(`category=${selectedCategories.join(',')}`);
  }

  if (dateRange && Object.keys(dateRange).length === 2) {
    queryParams.push(`from_date=${dateRange?.from}`);
    queryParams.push(`to_date=${dateRange?.to}`);
  }

  return queryParams.join('&');
};

export const formatTitle = (title: string, charCount: number): string => {
  if (title.length > charCount) {
    const truncatedTitle = title.slice(0, charCount) + '...';
    return `${truncatedTitle}`;
  }

  return title;
};

export const formatDateRange = (source: string, startDate: Date, endDate: Date) => {
  let from: string = '';
  let to: string = '';

  if (source === 'guardian' || source === 'news_api') {
    from = formatYYYYMMDDDate(startDate);
    to = formatYYYYMMDDDate(endDate);
  } else if (source === 'newyork_times') {
    from = formatDateCompact(startDate);
    to = formatDateCompact(endDate);
  }

  return { from, to };
};

export const formatYYYYMMDDDate = (inputDate: Date): string => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateCompact = (inputDate: Date): string => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
};
