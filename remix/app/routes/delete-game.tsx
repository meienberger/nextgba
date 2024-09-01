import { deleteGame } from "@/server/data";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const gameId = formData.get("gameId");
  invariant(gameId, "Missing gameId param");

  await deleteGame(gameId.toString());

  return json({ success: true });
};
