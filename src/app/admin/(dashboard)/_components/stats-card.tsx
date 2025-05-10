import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function StatCard({
  icon,
  title,
  value,
  borderColor,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  borderColor: string;
  href: string;
}) {
  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardHeader className="flex-row gap-2 sm:pb-2">
        {icon} <span className="text-muted-foreground">{title}</span>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <Link href={href} className="mt-2">
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export { StatCard };
