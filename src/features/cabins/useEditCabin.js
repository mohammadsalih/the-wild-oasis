import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      console.log(`we could not add the cabin , error : ${err}`);

      toast.error("we could not add the cabin");
    },
  });
  return { isEditing, editCabin };
}
