import axios from 'axios';
import { ApiResponse, Post, UserPostCount } from '../types';


export const fetchPosts = async (nameFilter?: string): Promise<ApiResponse> => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://jpdwxnz24w.us-east-1.awsapprunner.com/external/posts'
      : 'http://localhost:3000/external/posts';
    const url = nameFilter ? `${baseUrl}?name=${encodeURIComponent(nameFilter)}` : baseUrl;
    const response = await axios.get<ApiResponse>(url);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.error?.message && error?.response?.status < 500) {
      throw new Error(error.response.data.error.message);
    }
    console.error('Error fetching posts:', error);
    throw new Error('No se pudo obtener los datos. Intente más tarde.');
  }
};

export const transformPostsToUserCounts = (posts: Post[]): UserPostCount[] => {
  const userCounts = posts.reduce((acc: Record<string, number>, post: Post) => {
    const userName = post.name;
    acc[userName] = (acc[userName] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(userCounts)
    .map(([name, postCount]) => ({ name, postCount }))
    .sort((a, b) => b.postCount - a.postCount);
};

export const filterUserCountsByName = (
  userCounts: UserPostCount[],
  searchTerm: string
): UserPostCount[] => {
  if (!searchTerm.trim()) {
    return userCounts;
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  return userCounts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedSearch)
  );
};

export const getUserPostStatistics = async (nameFilter?: string): Promise<UserPostCount[]> => {
  try {
    const apiResponse = await fetchPosts(nameFilter);
    if (Array.isArray(apiResponse.data)) {
      return apiResponse.data.map((item: any) => ({ name: item.name, postCount: item.postCount }));
    }
    return [];
  } catch (error) {
    console.error('Error getting user post statistics:', error);
    throw error;
  }
};