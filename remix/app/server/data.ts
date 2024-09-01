import { notEmpty } from "@/lib/utils";
import fs from "node:fs";
import { z } from "zod";
import slugify from "slugify";
import path from "node:path";

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

export const uploadGame = async (params: { name: string; file: File }) => {
  const errors: Record<string, string> = {};

  const { name, file } = params;

  const gameId = slugify(name).toLowerCase();
  const gameConsole = file.name.split(".").pop();
  const path = `${BASE_PATH}/${gameId}`;

  if (await pathExists(path)) {
    errors.name = "A game with that name already exists";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Create folder for game
  await fs.promises.mkdir(path, { recursive: true });

  // Save the file
  await fs.promises.writeFile(`${path}/${gameId}.${gameConsole}`, new Uint8Array(await file.arrayBuffer()));

  // Save the metadata
  await fs.promises.writeFile(`${path}/metadata.json`, JSON.stringify({ name, gameId, console: gameConsole }));

  // Create saves folder
  await fs.promises.mkdir(`${path}/saves`, { recursive: true });
};

export const deleteGame = async (gameId: string) => {
  const path = `${BASE_PATH}/${gameId}`;

  await fs.promises.rmdir(path, { recursive: true });
};

export const getRomFile = async (gameId: string, csl: string) => {
  const file = fs.readFileSync(path.join(BASE_PATH, gameId, `${gameId}.${csl}`));

  return file;
};

export const getSaveState = async (gameId: string, saveId: string) => {
  const saveState = fs.readFileSync(path.join(BASE_PATH, gameId, "saves", `${saveId}.state`));

  return saveState;
};

export const getSaveImage = async (gameId: string, saveId: string) => {
  const image = fs.readFileSync(path.join(BASE_PATH, gameId, "saves", `${saveId}.png`));

  return image;
};
