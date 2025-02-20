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
  id?: string;
  title?: string;
}
