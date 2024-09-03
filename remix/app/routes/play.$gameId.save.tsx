import { saveGame } from "@/server/data";
import type { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { z } from "zod";

const input = z.object({
  state: z.string(),
  screenshot: z.string(),
  auto: z.coerce.boolean(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    invariant(params.gameId, "Missing gameId param");

    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    const data = input.parse(body);

    await saveGame({ gameId: params.gameId, ...data });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
