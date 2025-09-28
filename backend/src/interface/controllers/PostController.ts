import { Request, Response } from 'express';
import { PostUseCases } from '../../application/use-cases/PostServiceUseCases';
import { PostsResponseDto } from '../../domain/dtos/PostDto';
import { PostFilterOptions } from '../../domain/dtos/PostQueryParams';
import { PostsApiResponse } from '../../domain/dtos/PostsApiResponse';
import { PostQueryParams } from '../../infrastructure/validation/postValidation';
import logger from '../../infrastructure/logger/logger';

export class PostController {
  constructor(private postUseCases: PostUseCases) { }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const queryParams = req.query as PostQueryParams;
      const filters: PostFilterOptions = {};
      if (queryParams.name) {
        filters.name = queryParams.name;
      }

      logger.info('Processing posts request', { 
        hasFilters: Object.keys(filters).length > 0,
        filters
      });

      const posts: PostsResponseDto = await this.postUseCases.fetchAllPosts(filters);

      const response: PostsApiResponse = {
        data: posts,
        meta: {
          total: posts.length,
          filters: filters,
          timestamp: new Date().toISOString()
        }
      };

      res.json(response);
    } catch (err) {
      logger.error('Error al obtener los posts', { error: err });
      res.status(500).json({
        error: {
          message: 'No se pudo obtener los datos. Intente más tarde.'
        }
      });
    }
  }
}