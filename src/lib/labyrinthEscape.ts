const findShortestPath = (labyrinth: string[][]): number => {
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const rows = labyrinth.length;
  const cols = labyrinth[0].length;
  const queue: [number, number, number][] = []; // [row, col, distance]

  let startRow = 0, startCol = 0;
  // Find the start position
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (labyrinth[i][j] === 'S') {
        startRow = i;
        startCol = j;
        queue.push([i, j, 0]);
        break;
      }
    }
  }
  return -1; 
}

export default findShortestPath;
