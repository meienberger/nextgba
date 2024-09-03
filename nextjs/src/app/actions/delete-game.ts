"use server";

import { z } from "zod";
import fs from "fs";
import { action } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

const input = z.object({
  gameId: z.string(),
});

export const deleteGameAction = action(input, async ({ gameId }) => {
  try {
    const basePath = `/data/games/${gameId}`;

    // Delete the state file
    await fs.promises.rmdir(basePath, { recursive: true });

    revalidatePath("/");

    return { success: true };
  } catch (e) {
    throw new Error(`Error deleting game ${gameId}: ${(e as Error).message}`);
  }
});
