"use server";

import fs from "fs";
import { pathExists } from "@/lib/fs";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export const uploadGame = async (
  _: { success: boolean; errors: Record<string, string> },
  formData: FormData,
) => {
  let errors: Record<string, string> = {};
  const file = formData.get("game_file") as File;
  const name = formData.get("name") as string;

  if (!file) {
    errors.game_file = "A ROM file is required";
  }

  if (!name) {
    errors.name = "A unique name is required for the game";
  }

  const gameId = slugify(name).toLowerCase();
  const console = file.name.split(".").pop();
  const basePath = `/data/games/${gameId}`;

  if (await pathExists(basePath)) {
    errors.name = "A game with that name already exists";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Create folder for game
  await fs.promises.mkdir(basePath, { recursive: true });

  // Save the file
  await fs.promises.writeFile(
    `${basePath}/${gameId}.${console}`,
    new Uint8Array(await file.arrayBuffer()),
  );

  // Save the metadata
  await fs.promises.writeFile(
    `${basePath}/metadata.json`,
    JSON.stringify({ name, gameId, console }),
  );

  // Create saves folder
  await fs.promises.mkdir(`${basePath}/saves`, { recursive: true });

  revalidatePath("/");

  return {
    success: true,
    errors: {},
  };
};
