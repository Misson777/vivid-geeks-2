import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVICE_OPTIONS } from "@/constants/service-options";
import {
  useApproveOrRejectTicket,
  useListAllRecentTickets,
} from "@/queries/tickets/hooks";
import { formatDate } from "date-fns";
import { Check, CheckCheckIcon, Eye, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import ViewTicketDialog from "../../tickets/_components/view-ticket-dialog";

const RecentTickets = () => {
  const tickets = useListAllRecentTickets();
  const approveOrReject = useApproveOrRejectTicket();
  const [action, setAction] = React.useState<{
    type: "approve" | "reject" | null;
    ticketId: string | null;
  }>({
    type: null,
    ticketId: null,
  });

  if (tickets.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="rounded-md border  shadow">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Recent Tickets</h2>
        <Link href="/admin/tickets">
          <Button variant="default" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {(tickets.data?.length || 0) > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Approved?</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.data?.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.creator.name}</TableCell>
                <TableCell>
                  {SERVICE_OPTIONS.find(
                    (service) => service.value === ticket.subject,
                  )?.label || ticket.subject}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.approvalStatus === "APPROVED"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {ticket.approvalStatus}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(ticket.createdAt, "PPpp")}</TableCell>
                <TableCell className="text-right space-x-2">
                  <ViewTicketDialog ticket={ticket} />
                  <Button
                    variant="outline"
                    size="icon"
                    loading={
                      approveOrReject.isPending &&
                      action.type === "approve" &&
                      action.ticketId === ticket.id
                    }
                    onClick={() => {
                      setAction({
                        type: "approve",
                        ticketId: ticket.id,
                      });
                      approveOrReject.mutate({
                        ticketId: ticket.id,
                        approved: "APPROVED",
                      });
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive-outline"
                    size="icon"
                    loading={
                      approveOrReject.isPending &&
                      action.type === "reject" &&
                      action.ticketId === ticket.id
                    }
                    onClick={() => {
                      setAction({
                        type: "reject",
                        ticketId: ticket.id,
                      });
                      approveOrReject.mutate({
                        ticketId: ticket.id,
                        approved: "REJECTED",
                      });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-center text-muted-foreground">
            There are no recent open tickets to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentTickets;
