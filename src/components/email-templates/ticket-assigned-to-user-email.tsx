import { Html, Head, Body, Container, Text } from "@react-email/components";

interface TicketAssignedToUserEmailProps {
  userName: string;
  userEmail: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  description: string;
}

export default function TicketAssignedToUserEmail({
  userName,
  userEmail,
  clientName,
  clientEmail,
  subject,
  description,
}: TicketAssignedToUserEmailProps) {
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
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Hello {userName},
          </Text>

          <Text
            style={{ fontSize: "16px", marginBottom: "12px", color: "#374151" }}
          >
            The following support ticket has been assigned to you:
          </Text>

          <Container
            style={{
              margin: "16px 0",
              padding: "12px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
              textAlign: "left",
            }}
          >
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Subject:
            </Text>
            <Text style={{ fontSize: "14px", marginBottom: "8px" }}>
              {subject}
            </Text>

            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Description:
            </Text>
            <Text style={{ fontSize: "14px" }}>{description}</Text>
          </Container>

          <Text
            style={{ fontSize: "16px", marginTop: "20px", color: "#4b5563" }}
          >
            Client details:
          </Text>
          <Text style={{ fontSize: "16px", color: "#2563eb" }}>
            Name: <strong>{clientName}</strong>
          </Text>
          <Text style={{ fontSize: "16px", color: "#2563eb" }}>
            Email: <strong>{clientEmail}</strong>
          </Text>

          <Text
            style={{ fontSize: "16px", marginTop: "20px", color: "#2563eb" }}
          >
            You are now the point of contact for this issue. Please review and
            take action accordingly.
          </Text>

          <Text
            style={{ fontSize: "16px", marginTop: "20px", color: "#4b5563" }}
          >
            Your email address: <strong>{userEmail}</strong>
          </Text>

          <Text
            style={{ fontSize: "12px", color: "#6b7280", marginTop: "24px" }}
          >
            Thank you,
            <br />
            Vivid Geeks Support Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
