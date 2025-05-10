import type React from "react";
import { ArrowRight, Server, Shield, Zap, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SERVICES = [
  {
    icon: <Server className="h-8 w-8 text-primary" />,
    title: "Infrastructure",
    desc: "Reliable IT foundation",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Security",
    desc: "Comprehensive protection",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Optimization",
    desc: "Enhanced performance",
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "Support",
    desc: "24/7 expert assistance",
  },
];

export default function HeroSection() {
  return (
    <section id="hero" className="w-full py-16 md:py-24">
      <div className="container grid gap-8 px-4 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <Badge variant="secondary" className="w-fit">
            Reliable IT Solutions for Business Growth
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Empowering Your{" "}
            <span className="text-primary">Digital Transformation</span>
          </h1>

          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            We provide comprehensive IT services and solutions to help
            businesses thrive in the digital era with cutting-edge technology
            and expert support.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="default" className="group">
              Our Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary">Get Started</Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md border bg-card shadow-lg">
            <CardContent className="pt-3 sm:pt-6">
              <div className="grid grid-cols-2 gap-6">
                {SERVICES.map((ser, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center rounded-lg bg-accent/50 p-4 text-center"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                        {ser.icon}
                      </div>
                      <h3 className="mb-1 font-medium">{ser.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ser.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
