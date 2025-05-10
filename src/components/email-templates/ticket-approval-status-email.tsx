import { Html, Head, Body, Container, Text } from "@react-email/components";

interface TicketApprovalStatusEmailProps {
  name: string;
  email: string;
  subject: string;
  description: string;
  status: "approved" | "rejected";
}

export default function TicketApprovalStatusEmail({
  name,
  email,
  subject,
  description,
  status,
}: TicketApprovalStatusEmailProps) {
  const isApproved = status === "approved";

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
            Hello {name},
          </Text>

          <Text
            style={{ fontSize: "16px", marginBottom: "8px", color: "#374151" }}
          >
            Your support ticket has been{" "}
            <strong style={{ color: isApproved ? "#10b981" : "#ef4444" }}>
              {status}
            </strong>
            .
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

          {isApproved ? (
            <Text
              style={{ fontSize: "16px", color: "#4b5563", marginTop: "16px" }}
            >
              We’ll start working on it from now on. Thank you for reaching out
              to Vivid Geeks.
            </Text>
          ) : (
            <Text
              style={{ fontSize: "16px", color: "#4b5563", marginTop: "16px" }}
            >
              Unfortunately, this ticket has been rejected. If you believe this
              is an error, feel free to reach out to our support team.
            </Text>
          )}

          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
          >
            Email: <strong>{email}</strong>
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
