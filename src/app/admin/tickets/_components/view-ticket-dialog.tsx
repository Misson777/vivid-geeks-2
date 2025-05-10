import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ticket, TicketPriority, TicketStatus, User } from "@generated/prisma";
import PriorityBadge from "./priority-badge";
import StatusBadge from "./status-badge";
import { formatDate } from "date-fns";
import React from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import { SERVICE_OPTIONS } from "@/constants/service-options";

type Props = {
  ticket: Ticket & {
    engineer: User | null;
    creator: User;
  };
};

const ViewTicketDialog = ({ ticket: currentTicket }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>View Ticket</DialogTitle>
        </DialogHeader>
        {currentTicket && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-sm font-medium">ID</p>
                <p>{currentTicket.id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Client</p>
                <p>
                  {currentTicket.creator.name} ({currentTicket.creator.email})
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Subject</p>
              <p>
                {SERVICE_OPTIONS.find(
                  (service) => service.value === currentTicket.subject,
                )?.label || currentTicket.subject}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Priority</p>
                <div className="mt-1">
                  <PriorityBadge priority={currentTicket.priority} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="mt-1">
                  <StatusBadge status={currentTicket.status} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Created</p>
                <p>{formatDate(currentTicket.createdAt, "PPpp")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Updated</p>
                <p>{formatDate(currentTicket.updatedAt, "PPpp")}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Assigned To</p>
              <p>{currentTicket.engineer?.name || "Unassigned"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="mt-1 whitespace-pre-wrap">
                {currentTicket.message || "No description provided."}
              </p>
            </div>
          </div>
        )}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default ViewTicketDialog;
