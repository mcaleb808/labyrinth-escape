import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

describe('Labyrinth Grid UI', () => {
  it('allows selecting S, E, 0, or 1 in the dropdowns', () => {
    render(<Page />);
    const dropdowns = screen.getAllByRole('combobox') as HTMLSelectElement[];

    fireEvent.change(dropdowns[0], { target: { value: 'S' } });
    fireEvent.change(dropdowns[1], { target: { value: 'E' } });
    fireEvent.change(dropdowns[2], { target: { value: '0' } });
    fireEvent.change(dropdowns[3], { target: { value: '1' } });

    expect(dropdowns[0].value).toBe('S');
    expect(dropdowns[1].value).toBe('E');
    expect(dropdowns[2].value).toBe('0');
    expect(dropdowns[3].value).toBe('1');
  });
});
