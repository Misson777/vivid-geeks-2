"use server";

import { prisma } from "@/lib/prisma";

export const getDashboardStats = async () => {
  const totalTickets = await prisma.ticket.count();
  const totalClients = await prisma.user.count({
    where: {
      roles: { has: "USER" },
    },
  });
  const totalEngineers = await prisma.user.count({
    where: {
      roles: { has: "ENGINEER" },
    },
  });

  return {
    totalTickets,
    totalClients,
    totalEngineers,
  };
};
