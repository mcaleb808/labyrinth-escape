// app/page.tsx

export default function Home() {
  const initialLabyrinth = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Labyrinth Escape</h1>
      <div className="grid grid-cols-5 gap-2">
        {initialLabyrinth.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {row.map((cell, colIndex) => (
              <select
                key={colIndex}
                value={cell}
                className="w-12 h-12 border border-gray-300 text-center"
                role="combobox"
              >
                <option value=""></option>
              </select>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
