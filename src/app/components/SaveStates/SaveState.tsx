import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { DeleteSaveButton } from "./DeleteSaveButton";
import { Button } from "@/components/ui/button";

type Props = {
  gameId: string;
  saveStates: string[];
  onLoad: (saveId: string) => void;
};

export const SaveState = ({ gameId, saveStates, onLoad }: Props) => {
  if (saveStates.length === 0) {
    return <div>No saves found for this game</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-2">
      {saveStates.map((save) => (
        <Card key={save}>
          <CardHeader>
            <CardDescription>
              {save === "auto"
                ? "Auto save"
                : new Date(Number(save.split(".")[0])).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              alt="Save State"
              width={240}
              height={160}
              src={`/api/save/image?gameId=${gameId}&saveId=${save.replace(".state", "")}&random=${Math.random()}`}
              className="w-full rounded shadow-xl"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onLoad(save.replace(".state", ""));
              }}
            >
              Load
            </Button>
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
