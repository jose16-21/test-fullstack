import { expect } from 'chai';
import { PostService } from '../src/application/services/PostService';
import { PostFilterOptions } from '../src/domain/dtos/PostQueryParams';

describe('PostService Unit Tests', () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
  });

  describe('getAllPosts', () => {
    it('should be defined', () => {
      expect(postService).to.be.instanceOf(PostService);
      expect(postService.getAllPosts).to.be.a('function');
    });

    it('should return posts array', async () => {
      const posts = await postService.getAllPosts();

      expect(posts).to.be.an('array');
      if (posts.length > 0) {
        expect(posts[0]).to.have.property('name');
        expect(posts[0]).to.have.property('postCount');
        expect(posts[0]).to.not.have.property('id');
      }
    });

    it('should filter posts by name when filter is provided', async () => {
      const filters: PostFilterOptions = { name: 'Pedro' };
      const posts = await postService.getAllPosts(filters);
      
      expect(posts).to.be.an('array');
      
      posts.forEach(post => {
        expect(post.name.toLowerCase()).to.include('pedro');
      });
    });

    it('should return empty array when filter matches no posts', async () => {
      const filters: PostFilterOptions = { name: 'NonExistentName12345' };
      const posts = await postService.getAllPosts(filters);
      
      expect(posts).to.be.an('array');
      expect(posts).to.have.length(0);
    });
  });
});