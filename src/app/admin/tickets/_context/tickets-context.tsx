import { TicketPriority, TicketStatus } from "@generated/prisma";
import { createContext, useContext, useState } from "react";

type TicketFilters = {
  assignedTo: string;
  status: TicketStatus | "all";
  priority: TicketPriority | "all";
};

type TicketContext = {
  filters: TicketFilters;
  setFilters: React.Dispatch<React.SetStateAction<TicketFilters>>;
  resetFilters: () => void;
};

const Context = createContext<TicketContext | null>(null);

import React from "react";

type Props = {
  children: React.ReactNode;
};

const TicketContextProvider = (props: Props) => {
  const [filters, setFilters] = useState<TicketFilters>({
    assignedTo: "all",
    priority: "all",
    status: "all",
  });

  const resetFilters = () => {
    setFilters({
      assignedTo: "all",
      priority: "all",
      status: "all",
    });
  };

  return (
    <Context.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default TicketContextProvider;

export const useTicketContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useTicketContext must be inside TicketContextProvider");
  }

  return context;
};
