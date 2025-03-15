import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Home, LogOut, MonitorPlay, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { AiOutlineBarChart, AiOutlineHome, AiOutlineSchedule, AiOutlineSetting } from "react-icons/ai";
import { useTheme } from "./theme-provider";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <AiOutlineBarChart />,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: <AiOutlineSchedule />,
  },
  {
    title: "Cabins",
    url: "/admin/cabins",
    icon: <AiOutlineHome />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <AiOutlineSetting />,
  },
];

export function AppSidebar() {
  const { theme } = useTheme();
  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='mb-8'>
        <Link to='/'>
          <img src={theme === "light" ? "/logo.svg" : "/logo-dark.svg"} alt='Hotel logo' className='w-full pt-2' />
        </Link>
      </SidebarHeader>
      <SidebarContent className=''>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className='p-0'>
                <NavLink to={item.url} className={({ isActive }) => (isActive ? "bg-muted" : " ") + " w-full"}>
                  <Button variant='ghost' className='flex items-center justify-start w-full py-1 px-2' asChild>
                    <div>
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </Button>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className='p-0'>
        <Button variant='secondary' className='flex items-center justify-start w-full py-1 px-2'>
          <LogOut size={18} />
          <span>{"Log out"}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
