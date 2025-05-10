import { Html, Head, Body, Container, Text } from "@react-email/components";

interface IssueResolvedEmailProps {
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
}

export default function IssueResolvedEmail({
  userName,
  userEmail,
  subject,
  description,
}: IssueResolvedEmailProps) {
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
            style={{ fontSize: "16px", color: "#374151", marginBottom: "12px" }}
          >
            We’re happy to inform you that your issue has been{" "}
            <strong>resolved</strong>.
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
            Thank you for contacting Vivid Geeks. If you have any further
            concerns, feel free to reach out.
          </Text>

          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
          >
            Your email: <strong>{userEmail}</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
