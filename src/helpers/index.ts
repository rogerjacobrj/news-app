import { Article, Category, SelectOption, DateRange } from '../types';

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

  if (selectedCategories?.length > 0 && source === 'newyork_times') {
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

export const mergeArticleArrays = (articles: Article[], newArticles: Article[]) => {
  const uniqueItems = newArticles.filter(
    (newArticle: Article) =>
      !articles.some((article: { id: string }) => article.id === newArticle.id),
  );

  return [...articles, ...uniqueItems];
};

export const mergeCategoryArrays = (oldArray: Category[], newArray: Category[]) => {
  const combinedArray = [...oldArray, ...newArray];

  return combinedArray.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.id === value.id && t.name === value.name),
  );
};

export const removeCategoryDuplicates = (
  arr: { id: string; name: string }[],
): { id: string; name: string }[] => {
  return arr.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.id === value.id && t.name === value.name),
  );
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
