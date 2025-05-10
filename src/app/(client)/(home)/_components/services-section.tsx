import type React from "react";
import { Code, Server, Shield, Clock, Cloud, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SERVICES = [
  {
    title: "IT Consulting & Strategy",
    description:
      "Strategic technology planning and digital transformation roadmaps tailored to your business objectives.",
    icon: <Code className="size-6 sm:size-10 text-primary" />,
  },
  {
    title: "Managed IT Services",
    description:
      "Proactive monitoring, maintenance, and support for your entire IT infrastructure to ensure optimal performance.",
    icon: <Server className="size-6 sm:size-10 text-primary" />,
  },
  {
    title: "Cybersecurity Solutions",
    description:
      "Comprehensive security solutions to protect your business data and systems from threats and breaches.",
    icon: <Shield className="size-6 sm:size-10 text-primary" />,
  },
  {
    title: "Business Continuity",
    description:
      "Disaster recovery planning and backup solutions to keep your business running in any circumstance.",
    icon: <Clock className="size-6 sm:size-10 text-primary" />,
  },
  {
    title: "Cloud Computing",
    description:
      "Migration, management and optimization of cloud services for enhanced flexibility and scalability.",
    icon: <Cloud className="size-6 sm:size-10 text-primary" />,
  },
  {
    title: "Data Analytics",
    description:
      "Transform your raw data into actionable insights to drive better business decisions.",
    icon: <Database className="size-6 sm:size-10 text-primary" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-[800px] text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Our Professional IT Services
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We offer a wide range of IT services to help businesses leverage
            technology for growth and efficiency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Card key={i} className="bg-muted/50 border-0 h-full">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl sm:text-2xl">
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" className="px-8">
            Request Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
