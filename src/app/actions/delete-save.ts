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

/**
 * Given a username and password, logs in the user and returns a totpSessionId
 * if that user has 2FA enabled.
 */
export const deleteSaveAction = action(input, async ({ gameId, saveId }) => {
  try {
    const basePath = `./public/games/${gameId}/saves`;

    const statePath = path.join(basePath, `${saveId}.state`);

    // Delete the state file
    await fs.promises.unlink(statePath);

    revalidatePath(`/${gameId}/saves`);

    return { success: true };
  } catch (e) {
    console.error(`Error saving state for game ${gameId}`, e);

    throw new Error(`Error saving state for game ${gameId}`);
  }
});
