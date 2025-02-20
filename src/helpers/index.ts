export const formatTitle = (title: string, charCount: number): string => {
  if (title.length > charCount) {
    const truncatedTitle = title.slice(0, charCount) + '...';
    return `${truncatedTitle}`;
  }

  return title;
};
