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

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedLabyrinth = labyrinth.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setLabyrinth(updatedLabyrinth);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Labyrinth Escape</h1>
      <div className="grid grid-cols-5 gap-2">
        {labyrinth.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {row.map((cell, colIndex) => (
              <select
                key={colIndex}
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className="w-12 h-12 border border-gray-300 text-center text-black"
                role="combobox"
              >
                <option value=""></option>
                <option value="S">S</option>
                <option value="E">E</option>
                <option value="0">0</option>
                <option value="1">1</option>
              </select>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
