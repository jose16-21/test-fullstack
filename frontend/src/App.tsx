import SearchInput from './components/SearchInput';
import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import UserPostTable from './components/UserPostTable';
import { useUserPostData } from './hooks/useUserPostData';

export default function App() {
  // Debounce para el searchTerm
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    userCounts,
    loading,
    error,
  } = useUserPostData(debouncedSearchTerm);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Posts Dashboard</h1>
      <div className="mb-4 flex justify-center">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      <UserPostTable userCounts={userCounts} loading={loading} />
    </div>
  );
}
