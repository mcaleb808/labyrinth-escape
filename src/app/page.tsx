"use client";

import { useState } from 'react';

export default function Home() {
  const initialLabyrinth = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  const [labyrinth, setLabyrinth] = useState(initialLabyrinth);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);
  const [endPos, setEndPos] = useState<[number, number] | null>(null);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    let updatedLabyrinth = labyrinth.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );

    if (value === "S") {
      if (startPos) {
        const [prevRow, prevCol] = startPos;
        updatedLabyrinth[prevRow][prevCol] = "0"; // Reset the previous S position to 0
      }
      setStartPos([rowIndex, colIndex]);

      if (labyrinth[rowIndex][colIndex] === "E") {
        updatedLabyrinth[rowIndex][colIndex] = "S";
        const [prevRow, prevCol] = startPos!;
        updatedLabyrinth[prevRow][prevCol] = "E";
        setEndPos([prevRow, prevCol]);
      }
    } else if (value === "E") {
      if (endPos) {
        const [prevRow, prevCol] = endPos;
        updatedLabyrinth[prevRow][prevCol] = "0"; // Reset the previous E position to 0
      }
      setEndPos([rowIndex, colIndex]);

      if (labyrinth[rowIndex][colIndex] === "S") {
        updatedLabyrinth[rowIndex][colIndex] = "E";
        const [prevRow, prevCol] = endPos!;
        updatedLabyrinth[prevRow][prevCol] = "S";
        setStartPos([prevRow, prevCol]);
      }
    }

    setLabyrinth(updatedLabyrinth);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Labyrinth Escape</h1>
      <div className="grid grid-cols-5 gap-2">
        {labyrinth.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <select
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className="border p-2 text-center text-black"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="S">S</option>
                <option value="E">E</option>
              </select>
            );
          })
        )}
      </div>
    </div>
  );
}
