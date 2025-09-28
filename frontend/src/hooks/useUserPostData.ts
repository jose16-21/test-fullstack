
import { useState, useEffect, useMemo } from 'react';
import { UserPostCount } from '../types';
import { getUserPostStatistics } from '../services/api';

export const useUserPostData = (externalSearchTerm?: string) => {
  const [userCounts, setUserCounts] = useState<UserPostCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchData = async (nameFilter?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserPostStatistics(nameFilter);
      setUserCounts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err?.response?.data?.errors?.[0]?.type === 'string.min') {
        const backendMessage = err?.response?.data?.errors?.[0]?.message || 'Error de filtro';
        try {
          const allData = await getUserPostStatistics();
          setUserCounts(Array.isArray(allData) ? allData : []);
          setError(backendMessage);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Error al cargar los datos');
          setUserCounts([]);
        }
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos');
        setUserCounts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(externalSearchTerm ?? searchTerm);
  }, [externalSearchTerm, searchTerm]);

  const filteredUserCounts = userCounts;
  const statistics = useMemo(() => {
    const totalUsers = filteredUserCounts.length;
    const totalPosts = filteredUserCounts.map(u => u.postCount).join(', ');
    return {
      totalUsers,
      totalPosts,
      averagePostsPerUser: 0,
    };
  }, [filteredUserCounts]);

  return {
    userCounts: filteredUserCounts,
    allUserCounts: userCounts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statistics,
    refetch: fetchData,
  };
};