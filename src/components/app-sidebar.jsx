import * as React from "react";
import {
  GalleryVerticalEnd,
  BarChart3,
  MessageSquare,
  LayoutTemplate,
  Library,
  CalendarCheck2,
  Users,
  User,
  UserSquare,
  ListChecks,
  Upload,
  ChevronUp,
  Megaphone,
  FileText,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Gowtham",
    email: "gowtham@comez.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Chats",
      url: "/chats",
      icon: FaWhatsapp,
    },
    {
      title: "Templates",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Templates",
          url: "/templates",
          icon: LayoutTemplate,
        },
        {
          title: "Template Library",
          url: "#",
          icon: Library,
        },
      ],
    },
    {
      title: "Campaigns",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Campaigns",
          url: "#",
          icon: LayoutTemplate,
        },
        {
          title: "Campaign Calendar",
          url: "#",
          icon: CalendarCheck2,
        },
      ],
    },
    {
      title: "All Contacts",
      url: "#",
      icon: User,
      items: [
        {
          title: "Contacts",
          url: "#",
          icon: User,
        },
        {
          title: "Contact Groups",
          url: "#",
          icon: UserSquare,
        },
        {
          title: "Contact Attributes",
          url: "#",
          icon: ListChecks,
        },
        {
          title: "Import Contacts",
          url: "#",
          icon: Upload,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <span className="flex aspect-square size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sidebar-primary-foreground">
            <img src="/Comez-i.svg" alt="Comez Logo" className="size-6" />
          </span>
          <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg leading-tight">Comez</span>
            <span className="text-xs text-muted-foreground">Enhancing E-commerce</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
