"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Trash2Icon } from "lucide-react";
import { useDeleteClient, useListAllClients } from "@/queries/clients/hooks";
import { formatDate } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { confirm } from "@/components/ui/alert-dialog";

export default function ClientsTable() {
  const [searchEmail, setSearchEmail] = useState("");
  const clients = useListAllClients();

  const deleteClient = useDeleteClient();
  const onDelete = async (id: string) => {
    const should = await confirm({
      title: "Are you sure you want to delete this client?",
      description: "This action cannot be undone. Deleting the client will also delete all tickets created by this client.",
      variant: "destructive",
    })
    if (should) {
      deleteClient.mutate(id);
    }
  };

  if (clients.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }



  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          className="pl-8"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Tickets</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              const filteredClients = clients.data?.filter((client) =>
                client.email.toLowerCase().includes(searchEmail.toLowerCase()),
              );
              return (filteredClients?.length || 0) > 0 ? (
                filteredClients?.map((client, i) => (
                  <TableRow key={client.id}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client._count.createdTickets}</TableCell>
                    <TableCell>
                      {formatDate(client.createdAt, "PPpp")}
                    </TableCell>
                    <TableCell>
                      <Button variant={"destructive-outline"} size={"sm"} onClick={() => onDelete(client.id)}>
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No clients found.
                  </TableCell>
                </TableRow>
              );
            })()}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
