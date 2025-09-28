import React from 'react';
import { UserPostCount } from '../types';

interface UserPostTableProps {
  userCounts: UserPostCount[];
  loading?: boolean;
}

const UserPostTable: React.FC<UserPostTableProps> = ({ userCounts, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Cargando datos...</span>
      </div>
    );
  }

  if (userCounts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📊</div>
        <p className="text-gray-600">No se encontraron datos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-lg rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Usuario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cantidad de Posts
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userCounts.map(({ name, postCount }, index) => (
                <tr 
                  key={name} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-medium">
                          {name ? name.charAt(0).toUpperCase() : ''}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900">{postCount}</span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Posts
                      </span>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total de usuarios únicos: {userCounts.length}</span>
          <span>
            Total de posts: {userCounts.reduce((acc, u) => acc + u.postCount, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPostTable;