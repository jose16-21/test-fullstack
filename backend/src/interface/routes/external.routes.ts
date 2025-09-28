import { Router } from 'express';
import { PostUseCases } from '../../application/use-cases/PostServiceUseCases';
import { PostService } from '../../application/services/PostService';
import { PostController } from '../controllers/PostController';
import { validate } from '../middlewares/PostValidationMiddleware';

const router = Router();
const postService = new PostService();
const postUseCases = new PostUseCases(postService);
const controller = new PostController(postUseCases);

router.get(
  '/posts',
  validate.getQuery,
  (req, res) => controller.getAllPosts(req, res)
);

export default router;