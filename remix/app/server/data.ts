import { notEmpty } from "@/lib/utils";
import fs from "node:fs";
import { z } from "zod";

const BASE_PATH = process.env.NODE_ENV !== "production" ? "./games" : "/data/games";

const metadataSchema = z.object({
  name: z.string(),
  gameId: z.string(),
  console: z.enum(["gba", "gbc", "gb"]),
});

export const pathExists = async (path: string) => {
  return await fs.promises
    .access(path)
    .then(() => true)
    .catch(() => false);
};

export const getGameMetadata = async (gameId: string) => {
  const path = `${BASE_PATH}/${gameId}`;

  try {
    if (!(await pathExists(path))) {
      return null;
    }

    const metadata = await fs.promises.readFile(`${path}/metadata.json`, "utf-8");

    return metadataSchema.parse(JSON.parse(metadata));
  } catch (e) {
    return null;
  }
};

export type GameMetadata = NonNullable<Awaited<ReturnType<typeof getGameMetadata>>>;

export const getGamesMetadata = async () => {
  const exists = await pathExists(BASE_PATH);

  if (exists) {
    const folders = await fs.promises.readdir(BASE_PATH);

    const metadata = await Promise.all(
      folders.map(async (gameId) => {
        return getGameMetadata(gameId);
      }),
    );

    return metadata.filter(notEmpty);
  }

  return [];
};

export const getGameSaveStates = async (gameId: string) => {
  const savesFolderExists = await pathExists(`${BASE_PATH}/${gameId}/saves/`);

  let saveStateList: string[] = [];

  if (savesFolderExists) {
    const list = await fs.promises.readdir(`${BASE_PATH}/${gameId}/saves/`);
    saveStateList = list
      .filter((file) => file.endsWith(".state"))
      .reverse()
      .map((file) => file.replace(".state", ""));
  }

  return saveStateList;
};
