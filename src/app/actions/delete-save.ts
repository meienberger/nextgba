"use server";

import { z } from "zod";
import fs from "fs";
import { action } from "@/lib/safe-action";
import path from "path";
import { revalidatePath } from "next/cache";

const input = z.object({
  gameId: z.string(),
  saveId: z.string(),
});

export const deleteSaveAction = action(input, async ({ gameId, saveId }) => {
  try {
    const basePath = `/data/games/${gameId}/saves`;

    const statePath = path.join(basePath, `${saveId}.state`);

    // Delete the state file
    await fs.promises.unlink(statePath);

    revalidatePath(`/${gameId}/saves`);

    return { success: true };
  } catch (e) {
    throw new Error(`Error deleting save ${saveId} for game ${gameId}`);
  }
});
