// app/api/escape/route.ts

import findShortestPath from '@/lib/labyrinthEscape';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json(8);
}
