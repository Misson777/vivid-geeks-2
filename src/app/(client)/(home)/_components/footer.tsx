"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { CONTACT_INFO } from "@/constants/contact-info";

const FOOTER = [
  {
    title: "Services",
    links: [
      { name: "IT Consulting", href: "/services/it-consulting" },
      { name: "Managed IT Services", href: "/services/managed-it-services" },
      { name: "Cybersecurity", href: "/services/cybersecurity" },
      { name: "Cloud Solutions", href: "/services/cloud-solutions" },
      { name: "Data Analytics", href: "/services/data-analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
    ],
  },
];

// Create contact information data
const contactInfo = {
  title: "Contact",
  ...CONTACT_INFO
};

// Create social media links data
const socialLinks = [
  {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    href: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    href: "https://instagram.com",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block text-2xl font-bold">
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Empowering businesses with innovative IT solutions and reliable
              technology services for over 15 years.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Service and Company Links */}
          {FOOTER.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-medium">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{contactInfo.title}</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>{contactInfo.address.street}</p>
              <p>{contactInfo.address.city}</p>
            </address>
            <p className="text-muted-foreground">{contactInfo.email}</p>
            <p className="text-muted-foreground">{contactInfo.phone}</p>
          </div>
        </div>

        {/* Bottom Section with Copyright and Legal Links */}
        <div className="mt-12 pt-8 border-t border-muted/60 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Vividgeeks. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
