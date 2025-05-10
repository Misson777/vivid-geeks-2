import { ApprovalStatus } from "@generated/prisma";

export type OpenTicketByUserType = {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
};

export type CreateTicketType = {
  client: string;
  subject: string;
  priority: string;
  assignedTo: string;
  description: string;
};

export type EditTicketType = Omit<CreateTicketType, "client"> & {
  id: string;
  status: string;
};

export type ApproveOrRejectTicketType = {
  ticketId: string;
  approved: ApprovalStatus;
};
