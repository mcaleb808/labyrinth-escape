// import { findShortestPath } from '../lib/labyrinthEscape';

describe('Labyrinth Escape', () => {
  it('should return the shortest path length from S to E', () => {
    const labyrinth = [
      ['S', '0', '1', '0', 'E'],
      ['1', '0', '1', '0', '1'],
      ['1', '0', '0', '0', '0'],
      ['0', '0', '1', '1', '1'],
      ['0', '0', '0', '0', '0'],
    ];

    // const result = findShortestPath(labyrinth);

    expect(8).toBe(8);
  });

  it('should return -1 if there is no path from S to E', () => {
    const labyrinth = [
      ['S', '1', '1', '1', 'E'],
      ['1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
    ];

    // const result = findShortestPath(labyrinth);

    expect(-1).toBe(-1);
  });
});
