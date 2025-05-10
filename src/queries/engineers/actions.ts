"use server";

import { prisma } from "@/lib/prisma";
import { AddEngineerType } from "./types";

export const listAllEngineers = async () => {
  const engineers = await prisma.user.findMany({
    where: {
      roles: { has: "ENGINEER" },
    },
    include: {
      _count: {
        select: {
          assignedTickets: true,
        },
      },
    },
  });

  return engineers;
};

export const addEngineer = async (data: AddEngineerType) => {
  try {
    const exists = await prisma.user.findUnique({
      where: {
        email: data.email,
        roles: { has: "ENGINEER" },
      },
    });

    if (exists) {
      return {
        data: null,
        success: false,
        message: "Engineer already exists",
      };
    }

    const engineer = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        roles: ["ENGINEER"],
      },
      update: {
        name: data.name,
        phone: data.phone,
        roles: ["ENGINEER", "USER"],
      },
    });

    return {
      data: engineer,
      success: true,
      message: "Engineer added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: "Something went wrong, please try again later",
    };
  }
};

export const deleteEngineer = async (id: string) => {
  try {
    // First check if this user also has tickets as a creator (they could have both roles)
    const userAsCreator = await prisma.ticket.findFirst({
      where: {
        creatorId: id,
      },
    });

    // If they have created tickets, we need to handle those
    if (userAsCreator) {
      // We'll need to delete these tickets first
      await prisma.ticket.deleteMany({
        where: {
          creatorId: id,
        },
      });
    }

    // Now handle tickets where this user is assigned as engineer
    await prisma.ticket.updateMany({
      where: {
        engineerId: id,
      },
      data: {
        engineerId: null,
      },
    });

    // Finally, delete the engineer
    const engineer = await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      data: engineer,
      success: true,
      message: "Engineer deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: "Failed to delete engineer: " + (error instanceof Error ? error.message : String(error)),
    };
  }
};

