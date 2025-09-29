import axios from 'axios';
import { ApiResponse, UserPostCount } from '../types';


export const fetchPosts = async (nameFilter?: string): Promise<ApiResponse> => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://jpdwxnz24w.us-east-1.awsapprunner.com/posts'
      : 'http://localhost:3000/posts';
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