"use client";

import NextLink from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  DollarSign,
  FolderHeart,
  FolderKanbanIcon,
  Heart,
  Home,
  Link,
  MessageCircle,
  UserCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function AdminNav() {
  const segments = useSelectedLayoutSegments();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      current: segments.length === 0,
    },
    { name: "Users", href: "/admin/users", icon: Users, current: false },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanbanIcon,
      current: false,
    },
  ];

  return (
    <nav>
      <ul role="list" className="flex flex-col space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <NextLink
              href={item.href}
              className={cn(
                item.current
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                "font-regular group flex gap-x-3 rounded-md p-3 text-sm leading-6",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.name}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
