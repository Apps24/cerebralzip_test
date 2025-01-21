"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  List,
  Map,
  PieChart,
  Pyramid,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar.js";
import { Link } from "react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip.js";

const data = {
  menuItems: [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      name: "Campaigns",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Flows",
      url: "#",
      icon: Map,
    },
    {
      name: "Integrations",
      url: "#",
      icon: Pyramid,
    },
    {
      name: "Customers",
      url: "#",
      icon: List,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>MENU</SidebarGroupLabel>
          <SidebarMenu>
            {data.menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton isActive={item?.name === "Dashboard"} size="lg" asChild>
                  <Link to={item.url} className="text-lg">
                    <item.icon size={24} />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="hidden group-data-[collapsible=icon]:flex ">
          <SidebarMenu>
            {data.menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      asChild
                      className="flex justify-center items-center"
                    >
                      <Link to={item.url} className="text-lg">
                        <item.icon size={22} />
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
