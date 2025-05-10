"use server";

import {
  ApproveOrRejectTicketType,
  CreateTicketType,
  EditTicketType,
  OpenTicketByUserType,
} from "./types";
import { ActionResponse } from "../types";
import { prisma } from "@/lib/prisma";
import { TicketPriority, TicketStatus, User } from "@generated/prisma";
import { mail } from "@/lib/mail";
import { SERVICE_OPTIONS } from "@/constants/service-options";

export const openTicketByUser = async (
  data: OpenTicketByUserType
): Promise<ActionResponse<null>> => {
  // 1. Check if user exists
  // 2. If user exists, create ticket
  // 3. If user does not exist, create user and ticket

  try {
    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });
    }

    const ticket = await prisma.ticket.create({
      data: {
        message: data.message,
        subject: data.service,
        creatorId: user.id,
        priority: "MEDIUM",
      },
    });

    // notify to user and admin
    const res = await mail.sendTemplate(
      "contact-acknowledgement-email",
      {
        name: user.name,
        subject:
          SERVICE_OPTIONS.find((service) => service.value === data.service)
            ?.label || data.service,
        description: data.message,
        ticketId: ticket.id,
      },
      {
        to: user.email,
        subject: "Your Ticket Has Been Submitted",
      }
    );

    const res2 = await mail.sendTemplate(
      "admin-ticket-notification-email",
      {
        userName: user.name,
        userEmail: user.email,
        subject:
          SERVICE_OPTIONS.find((service) => service.value === data.service)
            ?.label || data.service,
        description: data.message,
        ticketId: ticket.id,
      },
      {
        to: process.env.NOTIFY_ADMIN_EMAIL as string,
        subject: "New Support Ticket Received",
      }
    );

    console.log(res, res2);

    return {
      data: null,
      success: true,
      message: `Ticket created successfully for ${user.name}`,
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

export const listAllRecentTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        engineer: true,
        creator: true,
      },
      where: {
        approvalStatus: "PENDING",
      },
    });

    return tickets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const listAllTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        engineer: true,
        creator: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        approvalStatus: "APPROVED",
      },
    });

    return tickets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createTicket = async (data: CreateTicketType) => {
  try {
    const client = await prisma.user.findUnique({
      where: {
        id: data.client,
        roles: { has: "USER" },
      },
    });

    if (!client) {
      return null;
    }

    let engineer: User | null = null;

    if (data.assignedTo && data.assignedTo.toLowerCase() !== "unassigned") {
      engineer = await prisma.user.findUnique({
        where: {
          id: data.assignedTo,
          roles: { has: "ENGINEER" },
        },
      });

      if (!engineer) {
        return null;
      }
    }

    const ticket = await prisma.ticket.create({
      data: {
        message: data.description,
        subject: data.subject,
        creatorId: data.client,
        priority: (data.priority || "MEDIUM") as TicketPriority,
        approvalStatus: "APPROVED",
        engineerId:
          data.assignedTo.toLowerCase() === "unassigned"
            ? null
            : data.assignedTo,
      },
    });

    await mail.sendTemplate(
      "ticket-created-user-email",
      {
        name: client.name,
        email: client.email,
        subject:
          SERVICE_OPTIONS.find((service) => service.value === data.subject)
            ?.label || data.subject,
        description: data.description,
        assignedEngineer: engineer
          ? {
              name: engineer?.name || "",
              email: engineer?.email || "",
            }
          : undefined,
      },
      {
        to: client.email,
        subject: "A Support Ticket Has Been Created For You",
      }
    );

    if (engineer) {
      await mail.sendTemplate(
        "ticket-assigned-to-user-email",
        {
          userName: engineer.name,
          userEmail: engineer.email,
          clientName: client.name,
          clientEmail: client.email,
          subject:
            SERVICE_OPTIONS.find((service) => service.value === data.subject)
              ?.label || data.subject,
          description: data.description,
        },
        {
          to: engineer.email,
          subject: "You Have Been Assigned A Support Ticket",
        }
      );
    }

    return ticket;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editTicket = async (data: EditTicketType) => {
  try {
    const oldTicket = await prisma.ticket.findUnique({
      where: {
        id: data.id,
      },
      include: {
        engineer: true,
      },
    });

    if (!oldTicket) return null;

    const ticket = await prisma.ticket.update({
      where: {
        id: data.id,
      },
      data: {
        message: data.description,
        subject: data.subject,
        priority: (data.priority || "MEDIUM") as TicketPriority,
        status: data.status as TicketStatus,
        engineerId:
          data.assignedTo.toLowerCase() === "unassigned"
            ? null
            : data.assignedTo,
      },
      include: {
        creator: true,
        engineer: true,
      },
    });

    if (
      data.assignedTo &&
      data.assignedTo.toLowerCase() !== "unassigned" &&
      oldTicket.engineer?.id !== data.assignedTo
    ) {
      await mail.sendTemplate(
        "issue-assigned-notification-email",
        {
          userName: ticket.creator.name,
          userEmail: ticket.creator.email,
          subject:
            SERVICE_OPTIONS.find((service) => service.value === ticket.subject)
              ?.label || ticket.subject,
          description: ticket.message,
          engineerName: ticket.engineer?.name || "",
          engineerEmail: ticket.engineer?.email || "",
        },
        {
          to: ticket.creator.email,
          subject: "Your Support Ticket Has Been Assigned",
        }
      );

      if (ticket.engineer && ticket.engineer.id !== oldTicket.engineer?.id) {
        await mail.sendTemplate(
          "ticket-assigned-to-user-email",
          {
            userName: ticket.engineer.name,
            userEmail: ticket.engineer.email,
            clientName: ticket.creator.name,
            clientEmail: ticket.creator.email,
            subject:
              SERVICE_OPTIONS.find(
                (service) => service.value === ticket.subject
              )?.label || ticket.subject,
            description: ticket.message,
          },
          {
            to: ticket.engineer.email,
            subject: "You Have Been Assigned A Support Ticket",
          }
        );
      }

      if (ticket.status === "RESOLVED" && oldTicket.status !== "RESOLVED") {
        await mail.sendTemplate(
          "issue-resolved-email",
          {
            userName: ticket.creator.name,
            userEmail: ticket.creator.email,
            subject:
              SERVICE_OPTIONS.find(
                (service) => service.value === ticket.subject
              )?.label || ticket.subject,
            description: ticket.message,
          },
          {
            to: ticket.creator.email,
            subject: "Your Support Ticket Has Been Resolved",
          }
        );
      }
    }

    return ticket;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const approveOrRejectTicket = async ({
  ticketId,
  approved,
}: ApproveOrRejectTicketType) => {
  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        approvalStatus: approved,
      },
      include: {
        creator: true,
      },
    });

    if (approved === "APPROVED") {
      await mail.sendTemplate(
        "ticket-approval-status-email",
        {
          name: ticket.creator.name,
          email: ticket.creator.email,
          subject:
            SERVICE_OPTIONS.find((service) => service.value === ticket.subject)
              ?.label || ticket.subject,
          description: ticket.message,
          status: "approved",
        },
        {
          to: ticket.creator.email,
          subject: "Your Support Ticket Has Been Approved",
        }
      );
    } else {
      await mail.sendTemplate(
        "ticket-approval-status-email",
        {
          name: ticket.creator.name,
          email: ticket.creator.email,
          subject:
            SERVICE_OPTIONS.find((service) => service.value === ticket.subject)
              ?.label || ticket.subject,
          description: ticket.message,
          status: "rejected",
        },
        {
          to: ticket.creator.email,
          subject: "Your Support Ticket Has Been Rejected",
        }
      );
    }

    return ticket;
  } catch (error) {
    console.log(error);
    return null;
  }
};
