import { Badge } from "@/components/ui/badge";
import { TicketPriority } from "@generated/prisma";
import React from "react";

type Props = {
  priority: TicketPriority;
};

const PriorityBadge = (props: Props) => {
  switch (props.priority) {
    case "CRITICAL":
      return <Badge variant="destructive">{props.priority}</Badge>;
    case "HIGH":
      return <Badge variant="warning">{props.priority}</Badge>;
    case "MEDIUM":
      return <Badge variant="secondary">{props.priority}</Badge>;
    case "LOW":
      return <Badge variant="outline">{props.priority}</Badge>;
    default:
      return <Badge variant="outline">{props.priority}</Badge>;
  }
};

export default PriorityBadge;
