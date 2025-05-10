import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TEAM = [
  {
    name: "Avash Aryal",
    title: "Tester",
    description: "Avash does all the testing of the Website.",
    imageSrc: "/team/avash.jpeg",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:#",
    },
  },
  {
    name: "Ritesh Dahal",
    title: "UI/UX Frontend",
    description: "Ritesh designs the website and helps in Frontend.",
    imageSrc: "/team/ritesh.jpg",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:#",
    },
  },
  {
    name: "Mission Chimariya",
    title: "Project Manager",
    description: "Mission manages the whole group but he does Backend.",
    imageSrc: "/team/mission.png",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:#",
    },
  },
  {
    name: "Pukar Man Tuladhar",
    title: "Backend Developer",
    description: "Pukar Man ensures the backend of the website.",
    imageSrc: "/team/pukar.png",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:#",
    },
  },
  {
    name: "Prabesh Shrestha",
    title: "Front End Developer",
    description: "Prabesh is Frontend developer of the website .",
    imageSrc: "/team/prabesh.png",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:#",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-[800px] text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Meet Our Expert Team
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Our team of certified IT professionals is dedicated to delivering
            exceptional service and innovative solutions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Card key={i} className="overflow-hidden h-full">
              <div className="aspect-[4/3] relative">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-5 bg-muted/40 border-t pt-2 border-muted/60">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className={`text-sm font-medium mb-2 text-primary`}>
                  {" "}
                  {member.title}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.description}
                </p>
                <div className="flex gap-3">
                  {member.socialLinks.linkedin && (
                    <a
                      target="_blank"
                      href={member.socialLinks.linkedin}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a
                      target="_blank"
                      href={member.socialLinks.twitter}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialLinks.email && (
                    <a
                      target="_blank"
                      href={member.socialLinks.email}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
