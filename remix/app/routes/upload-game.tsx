import { uploadGame } from "@/server/data";
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
} from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 500_000_000,
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler(),
  );

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const name = formData.get("name") as string;
  const file = formData.get("game_file") as File;

  const res = await uploadGame({ name, file });

  if (Object.keys(res?.errors ?? {}).length > 0) {
    return json({ errors: res?.errors, success: false });
  }

  return json({ success: true, errors: {} });
};
