// app/api/escape/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import findShortestPath from "../../../lib/labyrinthEscape";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }

  const { labyrinth } = await req.json();

  if (!labyrinth || !Array.isArray(labyrinth)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const shortestPathLength = findShortestPath(labyrinth);
    return NextResponse.json(
      { shortestPath: shortestPathLength },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
