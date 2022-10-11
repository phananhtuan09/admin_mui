interface AuthorProps {
  name: string;
  avatarUrl: string;
}
export interface PostProps {
  id: string;
  cover: string;
  title: string;
  createdAt: Date;
  view: number;
  comment: number;
  share: number;
  favorite: number;
  author: AuthorProps;
}
