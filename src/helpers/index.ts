import { Article } from '../types';

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
