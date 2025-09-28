export interface PostDto {
  createdAt: string;
  name: string;
  comment: string;
  id: string;
  prueba?: number;
}

export type PostsResponseDto = PostDto[];