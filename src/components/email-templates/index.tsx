import AdminTicketNotificationEmail from "./admin-ticket-notification-email";
import ContactAcknowledgementEmail from "./contact-acknowledgement-email";
import IssueAssignedNotificationEmail from "./issue-assigned-notification-email";
import IssueResolvedEmail from "./issue-resolved-email";
import TicketApprovalStatusEmail from "./ticket-approval-status-email";
import TicketAssignedToUserEmail from "./ticket-assigned-to-user-email";
import TicketCreatedUserEmail from "./ticket-created-user-email";

export const EMAIL_TEMPLATES = {
  "contact-acknowledgement-email": ContactAcknowledgementEmail,
  "admin-ticket-notification-email": AdminTicketNotificationEmail,
  "ticket-created-user-email": TicketCreatedUserEmail,
  "ticket-assigned-to-user-email": TicketAssignedToUserEmail,
  "ticket-approval-status-email": TicketApprovalStatusEmail,
  "issue-assigned-notification-email": IssueAssignedNotificationEmail,
  "issue-resolved-email": IssueResolvedEmail,
} as const;

export type EmailTemplate = keyof typeof EMAIL_TEMPLATES;
