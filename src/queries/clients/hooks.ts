import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteClient, listAllClients } from "./actions";
import toast from "react-hot-toast";

export const useListAllClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: listAllClients,
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteClient(id);
      if (res.success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      return false;
    },
  });
};
