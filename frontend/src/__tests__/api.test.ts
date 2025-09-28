
import axios from 'axios';

jest.mock('axios');
(axios.create as jest.Mock).mockReturnValue({
  get: jest.fn().mockResolvedValue({ data: { data: [] } }),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
});

import { transformPostsToUserCounts, filterUserCountsByName } from '../services/api';
import { Post, UserPostCount } from '../types';

const mockPosts: Post[] = [
  { id: '1', name: 'Juan Pérez', avatar: 'avatar1.jpg' },
  { id: '2', name: 'María García', avatar: 'avatar2.jpg' },
  { id: '3', name: 'Juan Pérez', avatar: 'avatar3.jpg' },
  { id: '4', name: 'Pedro Rodríguez', avatar: 'avatar4.jpg' },
  { id: '5', name: 'Juan Pérez', avatar: 'avatar5.jpg' },
];

describe('API Service', () => {
  describe('transformPostsToUserCounts', () => {
    test('groups posts by user and counts them', () => {
      const result = transformPostsToUserCounts(mockPosts);
      expect(result).toHaveLength(3);
  expect(result).toContainEqual({ name: 'Juan Pérez', postCount: 3 });
  expect(result).toContainEqual({ name: 'María García', postCount: 1 });
  expect(result).toContainEqual({ name: 'Pedro Rodríguez', postCount: 1 });
    });

    test('sorts users by post count descending', () => {
      const result = transformPostsToUserCounts(mockPosts);
  expect(result[0]).toEqual({ name: 'Juan Pérez', postCount: 3 });
  expect(result[1].postCount).toBeLessThanOrEqual(result[0].postCount);
  expect(result[2].postCount).toBeLessThanOrEqual(result[1].postCount);
    });

    test('handles empty posts array', () => {
      const result = transformPostsToUserCounts([]);
      expect(result).toEqual([]);
    });

    test('handles single post', () => {
      const singlePost: Post[] = [
        { id: '1', name: 'Solo Usuario', avatar: 'avatar.jpg' }
      ];
      const result = transformPostsToUserCounts(singlePost);
  expect(result).toEqual([{ name: 'Solo Usuario', postCount: 1 }]);
    });
  });

  describe('filterUserCountsByName', () => {
    const userCounts: UserPostCount[] = [
      { name: 'Juan Pérez', postCount: 3 },
      { name: 'María García', postCount: 1 },
      { name: 'Pedro Rodríguez', postCount: 1 },
    ];

    test('filters users by name (case insensitive)', () => {
  const result = filterUserCountsByName(userCounts, 'juan');
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({ name: 'Juan Pérez', postCount: 3 });
    });

    test('filters users by partial name match', () => {
    const result = filterUserCountsByName(userCounts, 'Mar');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ name: 'María García', postCount: 1 });
    });

    test('returns all users when search term is empty', () => {
    const result = filterUserCountsByName(userCounts, '');
    expect(result).toEqual(userCounts);
    });

    test('returns all users when search term is only whitespace', () => {
  const result = filterUserCountsByName(userCounts, '   ');
  expect(result).toEqual(userCounts);
    });

    test('returns empty array when no matches', () => {
  const result = filterUserCountsByName(userCounts, 'NoExiste');
  expect(result).toEqual([]);
    });


    test('trims whitespace from search term', () => {
  const result = filterUserCountsByName(userCounts, '  juan  ');
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({ name: 'Juan Pérez', postCount: 3 });
    });
  });

  describe('functional programming patterns', () => {
    test('transformPostsToUserCounts uses reduce and functional patterns', () => {
      const posts: Post[] = [
        { id: '1', name: 'User A', avatar: 'a.jpg' },
        { id: '2', name: 'User B', avatar: 'b.jpg' },
        { id: '3', name: 'User A', avatar: 'c.jpg' },
      ];
      const result = transformPostsToUserCounts(posts);
      expect(result).toEqual([
  { name: 'User A', postCount: 2 },
  { name: 'User B', postCount: 1 },
      ]);
      expect(posts).toHaveLength(3);
    });

    test('filterUserCountsByName uses functional array methods', () => {
      const userCounts: UserPostCount[] = [
        { name: 'Alpha User', postCount: 1 },
        { name: 'Beta User', postCount: 2 },
        { name: 'Gamma User', postCount: 3 },
      ];
      const result = filterUserCountsByName(userCounts, 'beta');
      expect(userCounts).toHaveLength(3);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Beta User');
    });
  });
});