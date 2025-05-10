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
import { Search, Trash, Trash2Icon } from "lucide-react";
import { formatDate } from "date-fns";
import { useDeleteEngineer, useListAllEngineers } from "@/queries/engineers/hooks";
import { Spinner } from "@/components/ui/spinner";
import ViewEngineerDialog from "./view-engineer-dialog";
import { confirm } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function EngineersTable() {
  const [searchEmail, setSearchEmail] = useState("");
  const engineers = useListAllEngineers();
  const del = useDeleteEngineer()

  const onDelete = async (id: string) => {
    const should = await confirm({
      title: "Are you sure you want to delete this engineer?",
      description: "This action cannot be undone. Deleting the engineer will also make the assigned tickets unassigned.",
      variant: "destructive",
    })
    if (should) {
      del.mutate(id);
    }
  };

  if (engineers.isLoading) {
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
          placeholder="Search engineers..."
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
              <TableHead>Assigned Tickets</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              const filteredEngineers = engineers.data?.filter((engineer) =>
                engineer.email.toLowerCase().includes(searchEmail.toLowerCase()),
              );
              return (filteredEngineers?.length || 0) > 0 ? (
                filteredEngineers?.map((engineer, i) => (
                  <TableRow key={engineer.id}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{engineer.name}</TableCell>
                    <TableCell>{engineer.email}</TableCell>
                    <TableCell>{engineer.phone}</TableCell>
                    <TableCell>{engineer._count.assignedTickets}</TableCell>
                    <TableCell>
                      {formatDate(engineer.createdAt, "PPpp")}
                    </TableCell>
                    <TableCell>
                      <Button variant={"destructive-outline"} size={"sm"} onClick={() => onDelete(engineer.id)}>
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No engineers found.
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
