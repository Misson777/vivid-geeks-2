import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveOrRejectTicket,
  createTicket,
  editTicket,
  listAllRecentTickets,
  listAllTickets,
  openTicketByUser,
} from "./actions";
import toast from "react-hot-toast";
import {
  ApproveOrRejectTicketType,
  CreateTicketType,
  EditTicketType,
  OpenTicketByUserType,
} from "./types";

export const useOpenTicketByUser = () => {
  return useMutation({
    mutationFn: async (data: OpenTicketByUserType) => {
      const res = await openTicketByUser(data);
      if (res.success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useListAllRecentTickets = () => {
  return useQuery({
    queryKey: ["recent-tickets"],
    queryFn: listAllRecentTickets,
  });
};

export const useListAllTickets = () => {
  return useQuery({
    queryKey: ["all-tickets"],
    queryFn: listAllTickets,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTicketType) => {
      const res = await createTicket(data);
      if (res) {
        return res;
      } else {
        throw new Error("Failed to create ticket");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tickets"] });
      toast.success("Ticket created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditTicketType) => {
      const res = await editTicket(data);
      if (res) {
        return res;
      } else {
        throw new Error("Failed to edit ticket");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tickets"] });
      toast.success("Ticket edited successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useApproveOrRejectTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApproveOrRejectTicketType) => {
      const res = await approveOrRejectTicket(data);
      if (res) {
        return data.approved ? "Ticket approved" : "Ticket rejected";
      } else {
        throw new Error("Failed to approve or reject ticket");
      }
    },
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["all-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["recent-tickets"] });
      toast.success(msg);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
