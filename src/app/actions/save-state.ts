"use server";

import { z } from "zod";
import fs from "fs";
import { action } from "@/lib/safe-action";
import path from "path";
import { revalidatePath } from "next/cache";

const input = z.object({
  gameId: z.string(),
  state: z.string(),
  screenshot: z.string(),
});

/**
 * Given a username and password, logs in the user and returns a totpSessionId
 * if that user has 2FA enabled.
 */
export const saveStateAction = action(
  input,
  async ({ gameId, state, screenshot }) => {
    try {
      const basePath = `/data/games/${gameId}/saves`;
      const saveId = new Date().getTime();

      // Ensure base path exists
      await fs.promises.mkdir(basePath, { recursive: true });

      const statePath = path.join(basePath, `${saveId}.state`);
      const screenshotPath = path.join(basePath, `${saveId}.png`);

      // Convert the state to a uint8 array
      const stateBuffer = Buffer.from(state, "base64");
      const screenshotBuffer = Buffer.from(screenshot, "base64");

      // Write the state to the file
      await fs.promises.writeFile(statePath, stateBuffer);
      await fs.promises.writeFile(screenshotPath, screenshotBuffer);

      revalidatePath(`/${gameId}/saves`);

      return { success: true };
    } catch (e) {
      console.error(`Error saving state for game ${gameId}`, e);

      throw new Error(`Error saving state for game ${gameId}`);
    }
  },
);
