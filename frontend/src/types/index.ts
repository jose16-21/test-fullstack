export interface Post {
  id: string;
  name: string;
  avatar: string;
}

export interface ApiResponse {
  data: Post[];
  meta: {
    total: number;
    filters: Record<string, any>;
    timestamp: string;
  };
}

export interface UserPostCount {
  name: string;
  postCount: number;
}