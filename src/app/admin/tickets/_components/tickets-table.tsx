"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListAllTickets } from "@/queries/tickets/hooks";
import { Spinner } from "@/components/ui/spinner";
import PriorityBadge from "./priority-badge";
import StatusBadge from "./status-badge";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare } from "lucide-react";
import { SERVICE_OPTIONS } from "@/constants/service-options";
import { Badge } from "@/components/ui/badge";
import ViewTicketDialog from "./view-ticket-dialog";
import { useTicketContext } from "../_context/tickets-context";
import EditTicketDialog from "./edit-ticket-dialog";
const TicketsTable = () => {
  const tickets = useListAllTickets();
  const { filters } = useTicketContext();
  const [filteredTickets, setFilteredTickets] = useState<typeof tickets.data>(
    [],
  );

  useEffect(() => {
    if (tickets.isLoading) return;

    const filtered = tickets.data?.filter((ticket) => {
      if (
        filters.assignedTo !== "all" &&
        ticket.engineer?.id !== filters.assignedTo
      ) {
        return false;
      }
      if (filters.priority !== "all" && ticket.priority !== filters.priority) {
        return false;
      }
      if (filters.status !== "all" && ticket.status !== filters.status) {
        return false;
      }
      return true;
    });

    setFilteredTickets(filtered);
  }, [tickets.data, filters, tickets.isLoading]);

  if (tickets.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : null}
            {filteredTickets?.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>
                  {SERVICE_OPTIONS.find(
                    (service) => service.value === ticket.subject,
                  )?.label || ticket.subject}
                </TableCell>
                <TableCell>{ticket.creator.name}</TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>{formatDate(ticket.createdAt, "PPpp")}</TableCell>
                <TableCell>
                  {ticket.engineer?.name || (
                    <Badge variant={"destructive-outline"}>Unassigned</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <ViewTicketDialog ticket={ticket} />
                    <EditTicketDialog
                      defaultValues={{
                        client: ticket.creator.id,
                        subject: ticket.subject,
                        priority: ticket.priority,
                        assignedTo: ticket.engineer?.id || "unassigned",
                        description: ticket.message,
                        status: ticket.status,
                        id: ticket.id,
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TicketsTable;
