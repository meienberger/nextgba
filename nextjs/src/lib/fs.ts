import fs from "fs";
import { z } from "zod";

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
  const basePath = `/data/games/${gameId}`;

  try {
    if (!(await pathExists(basePath))) {
      return null;
    }

    const metadata = await fs.promises.readFile(
      `${basePath}/metadata.json`,
      "utf-8",
    );

    return metadataSchema.parse(JSON.parse(metadata));
  } catch (e) {
    return null;
  }
};
