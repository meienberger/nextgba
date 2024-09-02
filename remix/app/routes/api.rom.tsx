import type { LoaderFunctionArgs } from "@remix-run/node";
import { getRomFile } from "@/server/data";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const csl = searchParams.get("console");

    if (typeof gameId !== "string" || typeof csl !== "string") {
      return new Response("Not found", { status: 404 });
    }

    const file = await getRomFile(gameId, csl);

    return new Response(file, {
      headers: { "content-type": "application/octet-stream", "cache-control": "public, max-age=31536000" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
