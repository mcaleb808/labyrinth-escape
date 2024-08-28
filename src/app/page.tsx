"use client";

import { useState } from 'react';
import LabyrinthGrid from '@/components/LabyrinthGrid';
import ControlPanel from '@/components/ControlPanel';
import { updateLabyrinth, handlePositionChange, switchEndWithStart } from '@/lib/helpers';
import { initialLabyrinth } from '@/lib/constants';

export default function Home() {

  const [labyrinth, setLabyrinth] = useState<string[][]>(initialLabyrinth);
  const [result, setResult] = useState<number | null>(null);
  const [path, setPath] = useState<[number, number][]>([]);
  const [startPos, setStartPos] = useState<[number, number]>([0, 0]);
  const [endPos, setEndPos] = useState<[number, number]>([0, 4]);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
  path.length && setPath([]);
  const updatedLabyrinth = updateLabyrinth(labyrinth, rowIndex, colIndex, value);

  const sharedParams = {rowIndex, colIndex, updatedLabyrinth};

  if (value === 'S') {
    handlePositionChange({...sharedParams, position: startPos, setPosition: setStartPos});
  } else if (value === 'E') {
    handlePositionChange({...sharedParams, position: endPos, setPosition: setEndPos});
  }

  if (labyrinth[rowIndex][colIndex] === 'E' && value === 'S') {
    switchEndWithStart({
      ...sharedParams,
      currentValue: 'E',
      newValue: 'S',
      setNewState: setEndPos,
      position: startPos,
    });
  } else if (labyrinth[rowIndex][colIndex] === 'S' && value === 'E') {
    switchEndWithStart({
      ...sharedParams,
      currentValue: 'S',
      newValue: 'E',
      setNewState: setStartPos,
      position: endPos,
    });
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
