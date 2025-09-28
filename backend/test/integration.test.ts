import { expect } from 'chai';
import request from 'supertest';
import app from '../src/config/server';

describe('API Integration Tests', () => {
  
  describe('Health Check', () => {
    it('should return OK status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).to.have.property('status', 'OK');
    });
  });

  describe('GET /external/posts', () => {
    it('should return posts without filters', async () => {
      const response = await request(app)
        .get('/external/posts')
        .expect(200);
      
      expect(response.body).to.have.property('data');
      expect(response.body).to.have.property('meta');
      expect(response.body.meta).to.have.property('total');
      expect(response.body.meta).to.have.property('filters');
      expect(response.body.meta).to.have.property('timestamp');
      expect(response.body.data).to.be.an('array');
    });

    it('should return filtered posts when name parameter is provided', async () => {
      const response = await request(app)
        .get('/external/posts?name=Pedro')
        .expect(200);
      
      expect(response.body).to.have.property('data');
      expect(response.body).to.have.property('meta');
      expect(response.body.meta.filters).to.have.property('name', 'Pedro');
      expect(response.body.data).to.be.an('array');
      
      // Verificar que todos los posts retornados contienen el nombre filtrado
      if (response.body.data.length > 0) {
        response.body.data.forEach((post: any) => {
          expect(post.name.toLowerCase()).to.include('pedro');
        });
      }
    });

    it('should return validation error for invalid name parameter', async () => {
      const response = await request(app)
        .get('/external/posts?name=P')
        .expect(400);
      
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property('code', 'VALIDATION_ERROR');
      expect(response.body.error).to.have.property('details');
      expect(response.body.error.details).to.be.an('array');
    });

    it('should return validation error for unknown query parameters', async () => {
      const response = await request(app)
        .get('/external/posts?invalidParam=test')
        .expect(400);
      
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property('code', 'VALIDATION_ERROR');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);
    });
  });
});