"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { MobileNavLink, NavLink } from "./nav-link";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/",
  },
  {
    label: "About",
    href: "/",
  },
  {
    label: "Team",
    href: "/",
  },
  {
    label: "Blogs",
    href: "/",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="border-b shadow-sm fixed top-0 w-full z-50 bg-background/60 backdrop-blur-3xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Mobile menu button */}
        <Button
          variant={"ghost"}
          size={"icon"}
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link, i) => (
            <NavLink key={i} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <Link href={"#contact"}>
            <Button>Contact Us</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background z-50 shadow-md md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <MobileNavLink key={i} href={link.href} onClick={toggleMenu}>
                  {link.label}
                </MobileNavLink>
              ))}
              <Link href={"#contact"}>
                <Button className="w-full">Contact Us</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
