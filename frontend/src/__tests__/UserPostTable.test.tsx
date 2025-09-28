import { render, screen } from '@testing-library/react';
import UserPostTable from '../components/UserPostTable';
import { UserPostCount } from '../types';

const mockUserCounts: UserPostCount[] = [
  { name: 'Juan Pérez', postCount: 5 },
  { name: 'María García', postCount: 3 },
  { name: 'Pedro Rodríguez', postCount: 7 },
];

describe('UserPostTable Component', () => {
  test('renders loading state', () => {
    render(<UserPostTable userCounts={[]} loading={true} />);
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
  });

  test('renders empty state when no data', () => {
    render(<UserPostTable userCounts={[]} loading={false} />);
    expect(screen.getByText('No se encontraron datos para mostrar')).toBeInTheDocument();
  });


  test('displays summary statistics', () => {
    render(<UserPostTable userCounts={mockUserCounts} loading={false} />);
    expect(screen.getByText('Total de usuarios únicos: 3')).toBeInTheDocument();
    expect(screen.getByText('Total de posts: 15')).toBeInTheDocument();
  });

  test('shows user initials in avatars', () => {
    render(<UserPostTable userCounts={mockUserCounts} loading={false} />);
    const avatars = screen.getAllByText(/^[JMPN]$/);
    expect(avatars).toHaveLength(3);
  });

  test('applies alternating row colors', () => {
    render(<UserPostTable userCounts={mockUserCounts} loading={false} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
  });

  test('renders table with user data', () => {
    render(<UserPostTable userCounts={mockUserCounts} loading={false} />);
    expect(screen.getByText('Usuario')).toBeInTheDocument();
    expect(screen.getByText('Cantidad de Posts')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('María García')).toBeInTheDocument();
    expect(screen.getByText('Pedro Rodríguez')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('renders with single user correctly', () => {
    const singleUser: UserPostCount[] = [
      { name: 'Solo Usuario', postCount: 10 }
    ];
    render(<UserPostTable userCounts={singleUser} loading={false} />);
    expect(screen.getByText('Solo Usuario')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Total de usuarios únicos: 1')).toBeInTheDocument();
    expect(screen.getByText('Total de posts: 10')).toBeInTheDocument();
  });
});