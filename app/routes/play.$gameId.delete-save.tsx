import { deleteSave } from "@/server/data";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.gameId, "Missing gameId param");

  const formData = await request.formData();
  const saveId = formData.get("saveId");

  invariant(saveId, "Missing saveId param");

  await deleteSave({ gameId: params.gameId, saveId: saveId as string });

  return json({ success: true });
};
