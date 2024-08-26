import Page from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Labyrinth Grid UI', () => {
  it('renders a 5x5 grid', () => {
    render(<Page />);
    const cells = screen.getAllByRole('combobox');
    expect(cells).toHaveLength(25); // 5x5 grid should have 25 cells
  });
});
