/**
 * @jest-environment node
 */

import { POST } from "@/app/api/escape/route";
import { initialLabyrinth } from "@/lib/constants";

describe("POST /api/escape", () => {
  it("should return the shortest path with status 200", async () => {
    const requestObj = {
      json: async () => ({
        labyrinth: initialLabyrinth,
      }),
      method: "POST",
    } as any;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.length).toBe(8);
  });

  it("should return status 400 for invalid input", async () => {
    const requestObj = {
      json: async () => ({
        labyrinth: null,
      }),
      method: "POST",
    } as any;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid input");
  });

  it("should return status 405 for unsupported HTTP methods", async () => {
    const requestObj = {
      method: "GET",
    } as any;

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(405);
    expect(body.error).toBe("Method GET Not Allowed");
  });

  it("should return status 500 when a starting point is not provided", async () => {
    const requestObj = {
      json: async () => ({
        labyrinth: [],
      }),
      method: "POST",
    } as any;

    const response = await POST(requestObj);

    expect(response.status).toBe(500);
  });
});
