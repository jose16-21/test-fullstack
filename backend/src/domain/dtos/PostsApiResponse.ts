import { PostsResponseDto } from './PostDto';
import { PostFilterOptions } from './PostQueryParams';

export interface PostsApiResponse {
    data: PostsResponseDto;
    meta: {
        total: number;
        filters: PostFilterOptions;
        timestamp: string;
    };
}