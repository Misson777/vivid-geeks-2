import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEngineer, deleteEngineer, listAllEngineers } from "./actions";
import { AddEngineerType } from "./types";
import toast from "react-hot-toast";

export const useListAllEngineers = () => {
  return useQuery({
    queryKey: ["engineers"],
    queryFn: listAllEngineers,
  });
};

export const useAddEngineer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddEngineerType) => {
      const res = await addEngineer(data);
      if (res.success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["engineers"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const useDeleteEngineer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteEngineer(id);
      if (res.success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["engineers"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      return false;
    },
  });
};
