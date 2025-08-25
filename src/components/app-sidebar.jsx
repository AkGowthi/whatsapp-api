import * as React from "react";
import {
  GalleryVerticalEnd,
  BarChart3,
  MessageSquare,
  LayoutTemplate,
  Library,
  CalendarCheck2,
  Users,
  UserSquare,
  ListChecks,
  Upload,
  ChevronUp,
  Megaphone,
  FileText,
  ChevronLeft,
  ChevronRight,
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
  useSidebar,
} from "@/components/ui/sidebar";

function SidebarChevronCollapse() {
  const { state, setOpen } = useSidebar();
  if (state === "collapsed") return null;
  return (
    <button
      className="absolute -right-4 top-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 focus:outline-none"
      onClick={() => setOpen(false)}
      title="Collapse sidebar"
    >
      <ChevronLeft className="w-5 h-5 text-gray-500" />
    </button>
  );
}

function SidebarChevronExpand() {
  const { state, setOpen } = useSidebar();
  if (state !== "collapsed") return null;
  return (
    <button
      className="fixed left-0 top-1/2 z-30 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 focus:outline-none ml-2"
      style={{ left: "24px" }}
      onClick={() => setOpen(true)}
      title="Expand sidebar"
    >
      <ChevronRight className="w-5 h-5 text-gray-500" />
    </button>
  );
}

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
          url: "/template-library",
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
          url: "/campaigns",
          icon: LayoutTemplate,
        },
        {
          title: "Campaign Calendar",
          url: "/campaign-calendar",
          icon: CalendarCheck2,
        },
      ],
    },
    {
      title: "Contacts",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Contacts",
          url: "/all-contacts",
          icon: Users,
        },
        {
          title: "Contact Groups",
          url: "/contact-groups",
          icon: UserSquare,
        },
        {
          title: "Contact Attributes",
          url: "/contact-attributes",
          icon: ListChecks,
        },
        {
          title: "Import Contacts",
          url: "/import-contacts",
          icon: Upload,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <>
      <Sidebar collapsible="icon" {...props} className="relative">
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
        <SidebarChevronCollapse />
      </Sidebar>
      <SidebarChevronExpand />
    </>
  );
}
