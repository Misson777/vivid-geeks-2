import { Badge } from "@/components/ui/badge";
import { TicketStatus } from "@generated/prisma";
import React from "react";

type Props = {
  status: TicketStatus;
};

const StatusBadge = (props: Props) => {
  switch (props.status) {
    case "OPEN":
      return <Badge variant="destructive">{props.status}</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="default">{props.status}</Badge>;
    case "RESOLVED":
      return <Badge variant="success">{props.status}</Badge>;
  }
};

export default StatusBadge;
