// components/ControlPanel.tsx
"use client";

import { FC } from 'react';

interface ControlPanelProps {
  onSubmit: () => void;
  onReset: () => void;
  result: number | null;
}

const ControlPanel: FC<ControlPanelProps> = ({ onSubmit, onReset, result }) => {
  return (
    <div className="mt-4 space-x-4">
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Find Shortest Path
      </button>
      <button
        onClick={onReset}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
      {result !== null && (
        <p className="mt-4 text-lg">
          Shortest Path Length: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

export default ControlPanel;
