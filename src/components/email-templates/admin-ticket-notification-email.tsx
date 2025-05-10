import { Html, Head, Body, Container, Text } from "@react-email/components";

interface AdminTicketNotificationEmailProps {
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  ticketId: string;
}

export default function AdminTicketNotificationEmail({
  userName,
  userEmail,
  subject,
  description,
  ticketId,
}: AdminTicketNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          color: "#000",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Text
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            🛎️ New Support Ticket Received
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "8px" }}>
            A new ticket has been submitted by <strong>{userName}</strong> (
            <a href={`mailto:${userEmail}`}>{userEmail}</a>).
          </Text>

          <Container
            style={{
              margin: "16px 0",
              padding: "12px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
            }}
          >
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Ticket ID:
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#1f2937",
                marginBottom: "8px",
              }}
            >
              {ticketId}
            </Text>

            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Subject:
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#1f2937",
                marginBottom: "8px",
              }}
            >
              {subject}
            </Text>

            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Description:
            </Text>
            <Text style={{ fontSize: "14px", color: "#1f2937" }}>
              {description}
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  );
}
