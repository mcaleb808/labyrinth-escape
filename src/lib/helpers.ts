// lib/helpers.ts

export const updateLabyrinth = (
  labyrinth: string[][],
  rowIndex: number,
  colIndex: number,
  value: string
): string[][] => {
  return labyrinth.map((row, rIdx) =>
    row.map((cell, cIdx) =>
      rIdx === rowIndex && cIdx === colIndex ? value : cell
    )
  );
};

export const resetPreviousPosition = (
  updatedLabyrinth: string[][],
  position: [number, number] | null
) => {
  if (position) {
    const [prevRow, prevCol] = position;
    updatedLabyrinth[prevRow][prevCol] = "0";
  }
};

export const handlePositionChange = (
  rowIndex: number,
  colIndex: number,
  updatedLabyrinth: string[][],
  position: [number, number] | null,
  setPosition: (pos: [number, number]) => void
) => {
  resetPreviousPosition(updatedLabyrinth, position);
  setPosition([rowIndex, colIndex]);
};
