"use server";

import { prisma } from "@/lib/prisma";

export const listAllClients = async () => {
  const clients = await prisma.user.findMany({
    where: {
      roles: { has: "USER" },
    },
    include: {
      _count: {
        select: {
          createdTickets: true,
        },
      },
    },
  });

  return clients;
};

export const deleteClient = async (id: string) => {
  try {
    // First check if this client has created any tickets
    const clientTickets = await prisma.ticket.findMany({
      where: {
        creatorId: id,
      },
    });

    // If there are tickets, we need to delete them first
    if (clientTickets.length > 0) {
      // Delete all tickets created by this client
      await prisma.ticket.deleteMany({
        where: {
          creatorId: id,
        },
      });
    }

    // Check if this client is also an engineer - if so, we need to handle assigned tickets
    const userAsEngineer = await prisma.ticket.findFirst({
      where: {
        engineerId: id,
      },
    });

    // If they're also an engineer, update assigned tickets
    if (userAsEngineer) {
      await prisma.ticket.updateMany({
        where: {
          engineerId: id,
        },
        data: {
          engineerId: null,
        },
      });
    }

    // Finally delete the client
    const client = await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      data: client,
      success: true,
      message: "Client deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: "Failed to delete client: " + (error instanceof Error ? error.message : String(error)),
    };
  }
};
