import fs from "fs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { DeleteSaveButton } from "./DeleteSaveButton";

type Props = {
  gameId: string;
};

export const SaveState = async ({ gameId }: Props) => {
  const exists = await fs.promises
    .access(`./public/games/${gameId}/saves`)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    return <div>No saves found for this game</div>;
  }

  const list = await fs.promises.readdir(`./public/games/${gameId}/saves`);
  const saves = list.filter((file) => file.endsWith(".state")).reverse();

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {saves.map((save) => (
        <Card key={save}>
          <CardHeader>
            <CardDescription>
              {new Date(Number(save.split(".")[0])).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              alt="Save State"
              width={240}
              height={160}
              src={`/games/${gameId}/saves/${save.replace(".state", ".png")}`}
              className="w-full rounded-2xl shadow-xl"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/${gameId}/play?save=${save}`}>Load</Link>
            <DeleteSaveButton
              saveId={save.replace(".state", "")}
              gameId={gameId}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
