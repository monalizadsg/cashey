import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBugdet } from "../../services/budget";

export function useAddBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBugdet,
    onSuccess: (data) => {
      console.log("addMutate data:", data);
      queryClient.invalidateQueries({
        queryKey: ["budgets", data.month, data.year],
      });
    },
  });
}
