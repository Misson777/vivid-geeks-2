"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "date-fns";
import { User } from "@generated/prisma";
import { useState } from "react";
import { useDeleteEngineer } from "@/queries/engineers/hooks";
import { AlertTriangle } from "lucide-react";

type EngineerWithCount = User & {
  _count: {
    assignedTickets: number;
  };
};

type Props = {
  engineer: EngineerWithCount;
  children: React.ReactNode;
};

export default function ViewEngineerDialog({ engineer, children }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteEngineerMutation = useDeleteEngineer();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteEngineerMutation.mutateAsync(engineer.id);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Engineer Details</DialogTitle>
          <DialogDescription>
            View engineer information and manage their account.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm font-medium">Name</p>
            <p className="mt-1">{engineer.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="mt-1">{engineer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="mt-1">{engineer.phone || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Assigned Tickets</p>
            <p className="mt-1">{engineer._count.assignedTickets}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Joined Date</p>
            <p className="mt-1">{formatDate(engineer.createdAt, "PPpp")}</p>
          </div>
        </div>        <DialogFooter className="flex items-center justify-between sm:justify-between border-t pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
            {isDeleting ? 
              "Deleting..." : 
              "This will unassign tickets and delete any tickets created by this engineer"
            }
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting || deleteEngineerMutation.isPending}
          >
            {isDeleting || deleteEngineerMutation.isPending ? "Deleting..." : "Delete Engineer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
