import { Article, Category } from '../types';

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
