"use client";

import type React from "react";

import { useState } from "react";
import { format } from "date-fns";
import { Ticket, Users, User } from "lucide-react";

import { useDashboardStats } from "@/queries/stats/hooks";
import { StatCard } from "./_components/stats-card";
import RecentTickets from "./_components/recent-tickets";

export default function Dashboard() {
  const stats = useDashboardStats();
  // Current time
  const currentTime = new Date();
  const formattedDate = format(currentTime, "EEEE, MMMM d, yyyy");

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* Current Time */}
      <div className="mb-6">
        <p className="text-muted-foreground">Current Time:</p>
        <p className="text-primary">{formattedDate}</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <StatCard
          href="/admin/tickets"
          icon={<Ticket className="h-6 w-6 text-blue-500" />}
          title="Open Tickets"
          value={stats.isLoading ? "--" : stats?.data?.totalTickets || 0}
          borderColor="border-l-blue-500"
        />
        <StatCard
          href="/admin/clients"
          icon={<Users className="h-6 w-6 text-green-500" />}
          title="Total Clients"
          value={stats.isLoading ? "--" : stats?.data?.totalClients || 0}
          borderColor="border-l-green-500"
        />
        <StatCard
          href="/admin/engineers"
          icon={<User className="h-6 w-6 text-purple-500" />}
          title="Total Engineers"
          value={stats.isLoading ? "--" : stats?.data?.totalEngineers || 0}
          borderColor="border-l-purple-500"
        />
      </div>

      {/* Recent Tickets */}
      <RecentTickets />
    </main>
  );
}
