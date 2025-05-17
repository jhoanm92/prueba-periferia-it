export interface Like {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  User?: User;
  Likes: Like[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  Posts?: Post[];
}
