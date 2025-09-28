import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../components/SearchInput';

describe('SearchInput Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with placeholder text', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('Buscar por nombre de usuario...')).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Buscar algo específico..."
      />
    );
    expect(screen.getByPlaceholderText('Buscar algo específico...')).toBeInTheDocument();
  });

  test('displays current value', () => {
    render(<SearchInput value="test value" onChange={mockOnChange} />);
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });

  test('calls onChange when typing', async () => {
    const user = userEvent.setup();
    render(<SearchInput value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Buscar por nombre de usuario...');
    await user.type(input, 'Juan');
    expect(mockOnChange).toHaveBeenCalledWith('J');
    expect(mockOnChange).toHaveBeenCalledWith('u');
    expect(mockOnChange).toHaveBeenCalledWith('a');
    expect(mockOnChange).toHaveBeenCalledWith('n');
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  test('shows clear button when value is not empty', () => {
    render(<SearchInput value="test" onChange={mockOnChange} />);
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  test('does not show clear button when value is empty', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    const clearButton = screen.queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  test('clears value when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchInput value="test" onChange={mockOnChange} />);
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  test('has proper accessibility attributes', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });
});