import { Html, Head, Body, Container, Text } from "@react-email/components";

interface Engineer {
  name: string;
  email: string;
}

interface TicketCreatedUserEmailProps {
  name: string;
  email: string;
  subject: string;
  description: string;
  assignedEngineer?: Engineer; // Optional
}

export default function TicketCreatedUserEmail({
  name,
  email,
  subject,
  description,
  assignedEngineer,
}: TicketCreatedUserEmailProps) {
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
            style={{ fontSize: "16px", marginBottom: "12px", color: "#374151" }}
          >
            A support ticket has been created on your behalf.
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
            Your email address: <strong>{email}</strong>
          </Text>

          {assignedEngineer ? (
            <Text
              style={{ fontSize: "16px", marginTop: "20px", color: "#2563eb" }}
            >
              Your ticket has been assigned to{" "}
              <strong>{assignedEngineer.name}</strong> (
              <a
                href={`mailto:${assignedEngineer.email}`}
                style={{ color: "#2563eb" }}
              >
                {assignedEngineer.email}
              </a>
              ).
            </Text>
          ) : (
            <Text
              style={{ fontSize: "16px", marginTop: "20px", color: "#4b5563" }}
            >
              Our team will review your request and assign an engineer shortly.
            </Text>
          )}

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
