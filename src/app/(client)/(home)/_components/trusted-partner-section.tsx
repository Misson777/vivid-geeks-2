import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const BENEFITS = [
  {
    text: "Certified IT professionals with extensive industry experience",
  },
  {
    text: "Tailored solutions designed for your specific business needs",
  },
  {
    text: "Proactive approach to prevent issues before they impact your business",
  },
  {
    text: "Transparent pricing with no hidden fees or surprise costs",
  },
  {
    text: "Commitment to staying ahead of technology trends and innovations",
  },
];

const STATISTICS = [
  {
    value: "15+",
    label: "Years of Experience",
  },
  {
    value: "500+",
    label: "Projects",
    subLabel: "Completed",
  },
  {
    value: "95%",
    label: "Client Retention",
    subLabel: "Rate",
  },
  {
    value: "24/7",
    label: "Technical Support",
  },
];

export default function TrustedPartnerSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted IT Partner for{" "}
              <span className="text-primary">Business Excellence</span>
            </h2>

            <p className="text-muted-foreground">
              With over 15 years of experience, TechSphere delivers innovative
              IT solutions to businesses across multiple industries. Our team of
              certified experts is committed to your success, providing reliable
              technology services that drive growth and efficiency.
            </p>

            <ul className="space-y-3">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATISTICS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    <div>{stat.label}</div>
                    {stat.subLabel && <div>{stat.subLabel}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0 sm:p-0">
                <div className="relative h-64 w-full bg-muted sm:h-80">
                  <Image
                    src="/laptop.jpg"
                    alt="Laptop with colorful lighting"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-semibold">Our Approach</h3>
                  <p className="text-muted-foreground">
                    We take a consultative approach to understand your business
                    challenges and objectives before recommending technology
                    solutions that deliver real value and measurable results.
                  </p>
                  <hr className="my-3" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Ready to get started?
                      </p>
                      <p className="font-medium">Let's discuss your IT needs</p>
                    </div>
                    <Link href={"#contact"}>
                      <Button size="lg">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
