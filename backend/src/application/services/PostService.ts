
import axios from 'axios';
import { config } from '../../config/environment';
import { PostsResponseDto } from '../../domain/dtos/PostDto';
import { PostFilterOptions } from '../../domain/dtos/PostQueryParams';
import logger from '../../infrastructure/logger/logger';


export class PostService {
  private readonly baseUrl = config.externalApiUrl;
  private readonly timeout = config.apiTimeout;

  async getAllPosts(filters?: PostFilterOptions): Promise<PostsResponseDto> {
    try {
      const response = await axios.get(this.baseUrl, {
        timeout: this.timeout
      });
      let posts: PostsResponseDto = response.data;

      if (!posts || !Array.isArray(posts)) {
        throw new Error('Respuesta externa vacía o inválida');
      }

      if (filters?.name) {
        posts = posts.filter(post =>
          post.name.toLowerCase().includes(filters.name!.toLowerCase())
        );
      }

      const counts: Record<string, number> = {};
      posts.forEach(post => {
        if (post.name) {
          counts[post.name] = (counts[post.name] || 0) + 1;
        }
      });
      const groupedData = Object.entries(counts).map(([name, postCount]) => ({ name, postCount }));
      return groupedData as any;
    } catch (error) {
      logger.error('Error al obtener los posts', { error });
      const err = new Error('Error al obtener los posts externos');
      (err as any).status = 500;
      throw err;
    }
  }
}