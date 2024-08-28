import { directions } from "./constants";
import { findStartPosition } from "./helpers";

const findShortestPath = (
  labyrinth: string[][]
): {
  length: number;
  path: [number, number][];
} => {
  const [startRow, startCol] = findStartPosition(labyrinth);

  const rows = labyrinth.length;
  const cols = labyrinth[0].length;
  const queue: [number, number, number, [number, number][]][] = []; // [row, col, distance, path]

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[startRow][startCol] = true;

  queue.push([startRow, startCol, 0, [[startRow, startCol]]]);

  while (queue.length > 0) {
    const [currentRow, currentCol, distance, path] = queue.shift()!;

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
          return { length: distance + 1, path: [...path, [newRow, newCol]] };
        }

        if (labyrinth[newRow][newCol] === "0") {
          queue.push([
            newRow,
            newCol,
            distance + 1,
            [...path, [newRow, newCol]],
          ]);
          visited[newRow][newCol] = true;
        }
      }
    }
  }

  return { length: -1, path: [] }; // Return -1 and an empty path if no path exists
};

export default findShortestPath;
