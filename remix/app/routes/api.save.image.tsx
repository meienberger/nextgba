import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSaveImage } from "@/server/data";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const saveId = searchParams.get("saveId");

    if (typeof gameId !== "string" || typeof saveId !== "string") {
      return new Response("Not found", { status: 404 });
    }

    const file = await getSaveImage(gameId, saveId);

    return new Response(file, { headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000" } });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
