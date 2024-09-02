import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";

export const useRevalidate = () => {
  let navigate = useNavigate();
  return useCallback(
    function revalidate() {
      navigate({ pathname: ".", search: window.location.search });
    },
    [navigate],
  );
};
