import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

describe('Labyrinth Grid UI', () => {
  let dropdowns: HTMLSelectElement[];
    beforeEach(() => {
      global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ path: [[0,1], [0,2]], length: 2 }),
      }),
      ) as jest.Mock;
});

  afterEach(() => {
      jest.restoreAllMocks();
  });

  beforeEach(() => {
    render(<Page />);
    dropdowns = screen.getAllByRole('combobox') as HTMLSelectElement[];
  });

  it('allows selecting S, E, 0, or 1 in the dropdowns', () => {
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    fireEvent.change(dropdowns[3], { target: { value: 'E' } });
    fireEvent.change(dropdowns[4], { target: { value: '0' } });
    fireEvent.change(dropdowns[5], { target: { value: '1' } });

    expect(dropdowns[1].value).toBe('S');
    expect(dropdowns[3].value).toBe('E');
    expect(dropdowns[4].value).toBe('0');
    expect(dropdowns[5].value).toBe('1');
  });

  it('enforces only one start (S) and one end (E) point in the grid', () => {
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    expect(dropdowns[1].value).toBe('S');

    // Set a second 'S' and ensure the first is cleared
    fireEvent.change(dropdowns[2], { target: { value: 'S' } });
    expect(dropdowns[1].value).toBe('0');
    expect(dropdowns[2].value).toBe('S');

    fireEvent.change(dropdowns[3], { target: { value: 'E' } });
    expect(dropdowns[3].value).toBe('E');

    fireEvent.change(dropdowns[4], { target: { value: 'E' } });
    expect(dropdowns[3].value).toBe('0');
    expect(dropdowns[4].value).toBe('E');
  });

  it('switches S and E positions correctly when they overlap', () => {
    fireEvent.change(dropdowns[0], { target: { value: 'E' } });
    
    expect(dropdowns[0].value).toBe('E');
    expect(dropdowns[4].value).toBe('S');

    // Reset
    fireEvent.change(dropdowns[0], { target: { value: 'S' } });
    expect(dropdowns[0].value).toBe('S');
    expect(dropdowns[4].value).toBe('E');
  });

  it('resets the grid when the reset button is clicked', () => {
    const resetButton = screen.getByText('Reset');
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    fireEvent.change(dropdowns[3], { target: { value: 'E' } });

    // Click reset
    fireEvent.click(resetButton);

    // Ensure the grid is reset to the initial state
    expect(dropdowns[1].value).toBe('0');
    expect(dropdowns[3].value).toBe('0');
    expect(dropdowns[0].value).toBe('S');
    expect(dropdowns[4].value).toBe('E');
  });

  it('highlights the shortest path correctly after submission', async () => {
    const submitButton = screen.getByText('Find Shortest Path');

    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    fireEvent.change(dropdowns[3], { target: { value: 'E' } });

    fireEvent.click(submitButton);

    await screen.findByText(/Shortest Path Length:/);

    // Check if the shortest path is highlighted
    const highlightedCells = screen.getAllByRole('combobox').filter(
      (dropdown) => dropdown.className.includes('bg-green-500')
    );
    fireEvent.change(dropdowns[0], { target: { value: '1' } });
    
    expect(highlightedCells.length).toBeGreaterThan(0);
  });
});
