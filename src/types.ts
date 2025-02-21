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
