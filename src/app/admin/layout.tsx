"use client";
import React from "react";
import { NavItem } from "./_components/nav-item";
import {
  Eye,
  LayoutDashboard,
  Ticket,
  Users,
  UserCog,
  Menu,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/queries/auth/hooks";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const logout = useLogout();
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 transform bg-[#1a1f2b] text-white transition-transform duration-300 ease-in-out">
        <div className="p-6">
          <div className="text-2xl font-bold">
            <span className="text-white">Vivid</span>
            <span className="text-blue-400">Geeks</span>
          </div>
        </div>
        <nav className="mt-6 space-y-1 px-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            href="/admin/"
            active={pathname === "/admin"}
          />
          <NavItem
            icon={<Ticket size={20} />}
            label="Tickets"
            href="/admin/tickets"
            active={pathname === "/admin/tickets"}
          />
          <NavItem
            icon={<Users size={20} />}
            label="Clients"
            href="/admin/clients"
            active={pathname === "/admin/clients"}
          />
          <NavItem
            icon={<User size={20} />}
            label="Engineers"
            href="/admin/engineers"
            active={pathname === "/admin/engineers"}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-end border-b bg-background px-4 shadow-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User size={20} />
                <span>Admin User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout.mutate()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
