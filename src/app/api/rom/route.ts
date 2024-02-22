import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const csl = searchParams.get("console");

    if (typeof gameId !== "string" || typeof csl !== "string") {
      return new Response("Not found", { status: 404 });
    }

    const file = fs.readFileSync(
      path.join("/data", "games", gameId, `${gameId}.${csl}`),
    );

    return new Response(file, {
      headers: { "content-type": "application/octet-stream" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
