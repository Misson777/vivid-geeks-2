import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "./actions";

export const useDashboardStats = () => {
  return useQuery({
    queryFn: getDashboardStats,
    queryKey: ["dashboard-stats"],
  });
};
