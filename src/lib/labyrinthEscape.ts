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

  let startRow = 0,
    startCol = 0;

  // Find the start position
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (labyrinth[i][j] === "S") {
        startRow = i;
        startCol = j;
        queue.push([i, j, 0]);
        break;
      }
    }
  }

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[startRow][startCol] = true;

  while (queue.length > 0) {
    const [currentRow, currentCol, distance] = queue.shift()!;

    for (const [dx, dy] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol]
      ) {
        if (labyrinth[newRow][newCol] === "E") {
          return distance + 1;
        }

        if (labyrinth[newRow][newCol] === "0") {
          queue.push([newRow, newCol, distance + 1]);
          visited[newRow][newCol] = true;
        }
      }
    }
  }

  return -1;
};

export default findShortestPath;
