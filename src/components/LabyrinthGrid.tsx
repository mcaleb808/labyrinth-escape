// components/LabyrinthGrid.tsx
"use client";

import { isEdgeCell } from '@/lib/helpers';
import { FC } from 'react';

interface LabyrinthGridProps {
  labyrinth: string[][];
  onInputChange: (rowIndex: number, colIndex: number, value: string) => void;
  isInPath: (rowIndex: number, colIndex: number) => boolean;
}

const LabyrinthGrid: FC<LabyrinthGridProps> = ({ labyrinth, onInputChange, isInPath }) => {

  return (
    <div className="grid grid-cols-5 gap-2">
      {labyrinth.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          return (
            <select
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(e) => onInputChange(rowIndex, colIndex, e.target.value)}
              className={`border p-2 text-center ${
                isInPath(rowIndex, colIndex) ? 'bg-green-500' : 'bg-white text-black'
              }`}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              {isEdgeCell(labyrinth, rowIndex, colIndex) && (
                <>
                  <option value="S">S</option>
                  <option value="E">E</option>
                </>
              )}
            </select>
          );
        })
      )}
    </div>
  );
};

export default LabyrinthGrid;
