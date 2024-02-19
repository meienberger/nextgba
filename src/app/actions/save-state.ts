"use server";

import { z } from "zod";
import fs from "fs";
import { action } from "@/lib/safe-action";

const input = z.object({
  game: z.string(),
  state: z.string(),
});

/**
 * Given a username and password, logs in the user and returns a totpSessionId
 * if that user has 2FA enabled.
 */
export const saveStateAction = action(input, async ({ game, state }) => {
  const path = `./public/games/${game}.state`;

  // Convert the state to a uint8 array
  const stateBuffer = Buffer.from(state, "base64");

  // Write the state to the file
  await fs.promises.writeFile(
    // `../../../public/games/${game}.state`,
    path,
    stateBuffer,
  );

  console.log(`Saved state for game ${game} to ${path}`);

  return { success: true };
});
