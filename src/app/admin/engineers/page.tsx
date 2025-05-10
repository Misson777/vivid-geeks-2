import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EngineersTable from "./_components/engineers-table";
import { Button } from "@/components/ui/button";
import AddEngineerDialog from "./_components/add-engineer-dialog";

export default function EngineersPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Engineers</h1>
        <p className="text-muted-foreground mt-2">
          View all engineers and their information in one place.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Engineers</CardTitle>
            <AddEngineerDialog />
          </div>
          <CardDescription>
            A comprehensive list of all engineers that have been created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EngineersTable />
        </CardContent>
      </Card>
    </div>
  );
}
