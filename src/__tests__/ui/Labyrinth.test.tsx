import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

describe('Labyrinth Grid UI', () => {
  let dropdowns: HTMLSelectElement[];

  beforeEach(() => {
    render(<Page />);
    dropdowns = screen.getAllByRole('combobox') as HTMLSelectElement[];
  });

  it('allows selecting S, E, 0, or 1 in the dropdowns', () => {
    fireEvent.change(dropdowns[0], { target: { value: 'S' } });
    fireEvent.change(dropdowns[1], { target: { value: 'E' } });
    fireEvent.change(dropdowns[2], { target: { value: '0' } });
    fireEvent.change(dropdowns[3], { target: { value: '1' } });

    expect(dropdowns[0].value).toBe('S');
    expect(dropdowns[1].value).toBe('E');
    expect(dropdowns[2].value).toBe('0');
    expect(dropdowns[3].value).toBe('1');
  });

  it('enforces only one start (S) and one end (E) point in the grid', () => {
// Set the first 'S'
    fireEvent.change(dropdowns[0], { target: { value: 'S' } });
    expect(dropdowns[0].value).toBe('S');

    // Set a second 'S' and ensure the first is cleared
    fireEvent.change(dropdowns[1], { target: { value: 'S' } });
    expect(dropdowns[0].value).toBe('0'); // Reset to default
    expect(dropdowns[1].value).toBe('S');

    // Set the first 'E'
    fireEvent.change(dropdowns[2], { target: { value: 'E' } });
    expect(dropdowns[2].value).toBe('E');

    // Set a second 'E' and ensure the first is cleared
    fireEvent.change(dropdowns[3], { target: { value: 'E' } });
    expect(dropdowns[2].value).toBe('0'); // Reset to default
    expect(dropdowns[3].value).toBe('E');
  });
});