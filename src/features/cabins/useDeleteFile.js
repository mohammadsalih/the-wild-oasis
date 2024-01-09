import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("cabin got deleted successfully ");
    },
    onError: (err) => {
      console.log(`we could not delete the cabin , error : ${err}`);

      toast.error("we could not delete the cabin");
    },
  });

  return { isDeleting, deleteCabin };
}
