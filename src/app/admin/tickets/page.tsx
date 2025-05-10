"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import TicketsTable from "./_components/tickets-table";
import Filters from "./_components/filters";
import TicketContextProvider from "./_context/tickets-context";
import CreateTicketDialog from "./_components/create-ticket-dialog";

export default function TicketsPage() {
  return (
    <TicketContextProvider>
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tickets Management</h1>
            <CreateTicketDialog />
          </div>

          <Filters />

          <TicketsTable />
        </div>
      </div>
    </TicketContextProvider>
  );
}
