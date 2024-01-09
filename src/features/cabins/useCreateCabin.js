import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success("new cabin added successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      console.log(`we could not add the cabin , error : ${err}`);

      toast.error("we could not add the cabin");
    },
  });

  return { isCreating, createCabin };
}
