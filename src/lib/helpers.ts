// lib/helpers.ts
import { Labyrinth, Position, SetPosition } from "./types";

export const updateLabyrinth = (
  labyrinth: Labyrinth,
  rowIndex: number,
  colIndex: number,
  value: string
): Labyrinth => {
  return labyrinth.map((row, rIdx) =>
    row.map((cell, cIdx) =>
      rIdx === rowIndex && cIdx === colIndex ? value : cell
    )
  );
};

export const resetPreviousPosition = (
  updatedLabyrinth: Labyrinth,
  position: Position
) => {
  if (position) {
    const [prevRow, prevCol] = position;
    updatedLabyrinth[prevRow][prevCol] = "0";
  }
};

export const handlePositionChange = (
  rowIndex: number,
  colIndex: number,
  updatedLabyrinth: Labyrinth,
  position: Position,
  setPosition: SetPosition
) => {
  resetPreviousPosition(updatedLabyrinth, position);
  setPosition([rowIndex, colIndex]);
};

export const isEdgeCell = (
  labyrinth: Labyrinth,
  rowIndex: number,
  colIndex: number
) => {
  return (
    rowIndex === 0 ||
    rowIndex === labyrinth.length - 1 ||
    colIndex === 0 ||
    colIndex === labyrinth[0].length - 1
  );
};

export const findStartPosition = (labyrinth: Labyrinth): [number, number] => {
  for (let i = 0; i < labyrinth.length; i++) {
    for (let j = 0; j < labyrinth[0].length; j++) {
      if (labyrinth[i][j] === "S") {
        return [i, j];
      }
    }
  }
  throw new Error("Start position 'S' not found in the labyrinth.");
};
