import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const saveId = searchParams.get("saveId");

    if (typeof gameId !== "string" || typeof saveId !== "string") {
      return new Response("Not found", { status: 404 });
    }

    const file = fs.readFileSync(
      path.join("/data", "games", gameId, "saves", `${saveId}.png`),
    );

    return new Response(file, { headers: { "content-type": "image/png" } });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
