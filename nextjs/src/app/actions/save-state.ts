"use server";

import { z } from "zod";
import fs from "fs";
import { action } from "@/lib/safe-action";
import path from "path";

const input = z.object({
  gameId: z.string(),
  state: z.string(),
  screenshot: z.string(),
  auto: z.boolean(),
});

export const saveStateAction = action(
  input,
  async ({ gameId, state, screenshot, auto }) => {
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
      if (!auto) {
        await fs.promises.writeFile(statePath, stateBuffer);
        await fs.promises.writeFile(screenshotPath, screenshotBuffer);
      }

      await fs.promises.writeFile(
        path.join(basePath, `auto.state`),
        stateBuffer,
      );
      await fs.promises.writeFile(
        path.join(basePath, `auto.png`),
        screenshotBuffer,
      );

      return { success: true, auto };
    } catch (e) {
      throw new Error(`Error saving state for game ${gameId}`);
    }
  },
);
