"use client";

import { DeleteSaveDialog } from "@/app/(player)/[game]/saves/components/DeleteSaveDialog";
import { deleteSaveAction } from "@/app/actions/delete-save";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  gameId: string;
  saveId: string;
};

export const DeleteSaveButton = ({ gameId, saveId }: Props) => {
  const router = useRouter();

  const deleteSave = useAction(deleteSaveAction, {
    onSuccess: () => {
      toast.success("Save deleted");
      router.refresh();
    },
  });

  return (
    <DeleteSaveDialog onClick={() => deleteSave.execute({ gameId, saveId })} />
  );
};
