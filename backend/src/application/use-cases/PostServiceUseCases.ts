import { PostService } from '../services/PostService';
import { PostsResponseDto } from '../../domain/dtos/PostDto';
import { PostFilterOptions } from '../../domain/dtos/PostQueryParams';

export class PostUseCases {
  constructor(private postService: PostService) {}

  async fetchAllPosts(filters?: PostFilterOptions): Promise<PostsResponseDto> {
    return this.postService.getAllPosts(filters);
  }
}