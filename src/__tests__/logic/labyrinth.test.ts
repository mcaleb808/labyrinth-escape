import { initialLabyrinth } from "@/lib/constants";
import { findStartPosition } from "@/lib/helpers";
import findShortestPath from "@/lib/labyrinthEscape";

describe("Labyrinth Escape", () => {
  it("should return the shortest path length from S to E", () => {
    const result = findShortestPath(initialLabyrinth);

    expect(result?.length).toBe(8);
  });

  it("should return -1 if there is no path from S to E", () => {
    const labyrinth = [
      ["S", "1", "1", "1", "E"],
      ["1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
    ];

    const result = findShortestPath(labyrinth);

    expect(result?.length).toBe(-1);
  });

  it("should throw an error when the start position 'S' is not found", () => {
    const labyrinthWithoutS = [
      ["0", "0", "1"],
      ["1", "0", "0"],
      ["0", "0", "E"]
    ];

    expect(() => findStartPosition(labyrinthWithoutS)).toThrow(
      "Start position 'S' not found in the labyrinth."
    );
  });

});
