import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { DeleteSaveStateDialog } from "./delete-save-state-dialog";
import { Link } from "@remix-run/react";

type Props = {
  gameId: string;
  saveState: string;
  onLoad: () => void;
};

export const SaveStateCard = ({ gameId, saveState, onLoad }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{saveState === "auto" ? "Auto save" : new Date(Number(saveState.split(".")[0])).toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          alt="Save State"
          width={240}
          height={160}
          src={`/api/save/image?gameId=${gameId}&saveId=${saveState.replace(".state", "")}`}
          className="w-full rounded shadow-xl"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          onClick={onLoad}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
          to={`/play/${gameId}?save=${saveState.replace(".state", "")}`}
        >
          Load
        </Link>
        <DeleteSaveStateDialog saveId={saveState.replace(".state", "")} />
      </CardFooter>
    </Card>
  );
};
