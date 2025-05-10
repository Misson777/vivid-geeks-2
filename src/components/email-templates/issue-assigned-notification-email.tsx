import { Html, Head, Body, Container, Text } from "@react-email/components";

interface IssueAssignedNotificationEmailProps {
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  engineerName: string;
  engineerEmail: string;
}

export default function IssueAssignedNotificationEmail({
  userName,
  userEmail,
  subject,
  description,
  engineerName,
  engineerEmail,
}: IssueAssignedNotificationEmailProps) {
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
            Your issue has been assigned to one of our engineers.
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
            style={{ fontSize: "16px", color: "#4b5563", marginTop: "16px" }}
          >
            Assigned Engineer:
          </Text>
          <Text style={{ fontSize: "16px", color: "#2563eb" }}>
            {engineerName} ({engineerEmail})
          </Text>

          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
          >
            We’ll keep you updated as progress is made. Thank you for contacting
            Vivid Geeks.
          </Text>

          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginTop: "12px" }}
          >
            Your email: <strong>{userEmail}</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
