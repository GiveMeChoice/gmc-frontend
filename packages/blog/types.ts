export interface BlogPost {
  _id: string;
  title: string;
  date: Date;
  content: any;
  content2: any;
  coverImage: BlogImage;
  contentImage: BlogImage;
  subtitle: string;
  excerpt: string;
  categories: BlogCategory[];
  slug: string;
  author: BlogAuthor;
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogImage {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
}

export interface BlogAuthor {
  name: string;
  picture: BlogImage;
}
