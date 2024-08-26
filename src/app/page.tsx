// app/page.tsx
"use client";

import { useState } from 'react';
import LabyrinthGrid from '@/components/LabyrinthGrid';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  const initialLabyrinth = [
    ['S', '0', '1', '0', 'E'],
    ['1', '0', '1', '0', '1'],
    ['1', '0', '0', '0', '0'],
    ['0', '0', '1', '1', '1'],
    ['0', '0', '0', '0', '0'],
  ];

  const [labyrinth, setLabyrinth] = useState<string[][]>(initialLabyrinth);
  const [result, setResult] = useState<number | null>(null);
  const [path, setPath] = useState<[number, number][]>([]);
  const [startPos, setStartPos] = useState<[number, number]>([0, 0]);
  const [endPos, setEndPos] = useState<[number, number]>([0, 4]);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    path.length && setPath([]);
    let updatedLabyrinth = labyrinth.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );

    if (value === "S") {
      if (startPos) {
        const [prevRow, prevCol] = startPos;
        updatedLabyrinth[prevRow][prevCol] = "0";
      }
      setStartPos([rowIndex, colIndex]);

      if (labyrinth[rowIndex][colIndex] === "E") {
        updatedLabyrinth[rowIndex][colIndex] = "S";
        const [prevRow, prevCol] = startPos;
        updatedLabyrinth[prevRow][prevCol] = "E";
        setEndPos([prevRow, prevCol]);
      }
    } else if (value === "E") {
      if (endPos) {
        const [prevRow, prevCol] = endPos;
        updatedLabyrinth[prevRow][prevCol] = "0";
      }
      setEndPos([rowIndex, colIndex]);

      if (labyrinth[rowIndex][colIndex] === "S") {
        updatedLabyrinth[rowIndex][colIndex] = "E";
        const [prevRow, prevCol] = endPos;
        updatedLabyrinth[prevRow][prevCol] = "S";
        setStartPos([prevRow, prevCol]);
      }
    }

    setLabyrinth(updatedLabyrinth);
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/escape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ labyrinth }),
    });

    const data = await response.json();
    setResult(data.length);
    setPath(data.path);
  };

  const handleReset = () => {
    setLabyrinth(initialLabyrinth);
    setResult(null);
    setPath([]);
    setStartPos([0, 0]);
    setEndPos([0, 4]);
  };

  const isInPath = (rowIndex: number, colIndex: number) => {
    return path.some(([r, c]) => r === rowIndex && c === colIndex);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Labyrinth Escape</h1>
      <LabyrinthGrid 
        labyrinth={labyrinth} 
        onInputChange={handleInputChange} 
        isInPath={isInPath}
      />
      <ControlPanel 
        onSubmit={handleSubmit} 
        onReset={handleReset} 
        result={result} 
      />
    </div>
  );
}
