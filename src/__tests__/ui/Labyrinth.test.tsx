import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

describe('Labyrinth Grid UI', () => {
  let dropdowns: HTMLSelectElement[];

  beforeEach(() => {
    render(<Page />);
    dropdowns = screen.getAllByRole('combobox') as HTMLSelectElement[];
  });

  it('allows selecting S, E, 0, or 1 in the dropdowns', () => {
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    fireEvent.change(dropdowns[3], { target: { value: 'E' } });
    fireEvent.change(dropdowns[4], { target: { value: '0' } });
    fireEvent.change(dropdowns[5], { target: { value: '1' } });

    // Ensure the first dropdown has 'S'
    expect(dropdowns[1].value).toBe('S');
    // Ensure the second dropdown has 'E'
    expect(dropdowns[3].value).toBe('E');
    // Ensure the third dropdown has '0'
    expect(dropdowns[4].value).toBe('0');
    // Ensure the fourth dropdown has '1'
    expect(dropdowns[5].value).toBe('1');
  });

  it('enforces only one start (S) and one end (E) point in the grid', () => {
    // Set the first 'S'
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    expect(dropdowns[1].value).toBe('S');

    // Set a second 'S' and ensure the first is cleared
    fireEvent.change(dropdowns[2], { target: { value: 'S' } });
    expect(dropdowns[1].value).toBe('0'); // The first S should be reset to '0'
    expect(dropdowns[2].value).toBe('S'); // The second S should be 'S'
  });
});
