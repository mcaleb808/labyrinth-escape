/**
 * @jest-environment node
 */

import { POST } from "@/app/api/escape/route";


describe('POST /api/escape', () => {
  it('should return the shortest path with status 200', async () => {
    // Mock the request object
    const requestObj = {
      json: async () => ({
        labyrinth: [
          ['S', '0', '1', '0', 'E'],
          ['1', '0', '1', '0', '1'],
          ['1', '0', '0', '0', '0'],
          ['0', '0', '1', '1', '1'],
          ['0', '0', '0', '0', '0'],
        ],
      }),
      method: 'POST',
    } as any;

    // Call the POST function
      const response = await POST(requestObj);
      console.log(response, 'response');
    const body = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(body.shortestPath).toBe(8);
  });

  it('should return status 400 for invalid input', async () => {
    // Mock the request object with invalid data
    const requestObj = {
      json: async () => ({
        labyrinth: null,
      }),
      method: 'POST',
    } as any;

    // Call the POST function
    const response = await POST(requestObj);
    const body = await response.json();

    // Assertions
    expect(response.status).toBe(400);
    expect(body.error).toBe('Invalid input');
  });

  it('should return status 405 for unsupported HTTP methods', async () => {
    // Mock the request object with unsupported method
    const requestObj = {
      method: 'GET',
    } as any;

    // Call the POST function
    const response = await POST(requestObj);
    const body = await response.text();

    // Assertions
    expect(response.status).toBe(405);
    expect(body).toBe('Method GET Not Allowed');
  });
});
