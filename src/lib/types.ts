// lib/types.ts

export type Labyrinth = string[][];
export type Position = [number, number] | null;
export type SetPosition = (pos: [number, number]) => void;
