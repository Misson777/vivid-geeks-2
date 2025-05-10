import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from "@react-email/components";

interface ContactAcknowledgementEmailProps {
  name: string;
  subject: string;
  description: string;
  ticketId: string;
}

export default function ContactAcknowledgementEmail({
  name,
  subject,
  description,
  ticketId,
}: ContactAcknowledgementEmailProps) {
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
            Thank you for contacting us, {name}!
          </Text>

          <Text
            style={{ fontSize: "16px", color: "#4b5563", marginBottom: "12px" }}
          >
            Your issue has been successfully created with the following details:
          </Text>

          <Container
            style={{
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
              textAlign: "left",
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

          <Text style={{ fontSize: "14px", marginBottom: "20px" }}>
            Our team at <strong>Vivid Geeks</strong> appreciates your patience.
            You’ll be notified if there are any updates on your ticket.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
