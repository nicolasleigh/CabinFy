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
import { useLogout } from "@/features/authentication/useLogout";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineBarChart,
  AiOutlineExport,
  AiOutlineHome,
  AiOutlineLeftCircle,
  AiOutlineSchedule,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const items = [
  {
    title: "sidebarDashboard",
    url: "/admin/dashboard",
    icon: <AiOutlineBarChart />,
  },
  {
    title: "sidebarBookings",
    url: "/admin/bookings",
    icon: <AiOutlineSchedule />,
  },
  {
    title: "sidebarCabins",
    url: "/admin/cabins",
    icon: <AiOutlineHome />,
  },
  {
    title: "sidebarSettings",
    url: "/admin/settings",
    icon: <AiOutlineSetting />,
  },
  {
    title: "sidebarGuestPage",
    url: "/home",
    icon: <AiOutlineLeftCircle />,
  },
  {
    title: "sidebarBlog",
    url: "https://linze.pro",
    icon: <AiOutlineExport />,
  },
];

export function AppSidebar() {
  // const { theme } = useTheme();
  const { logout, isLoading } = useLogout();
  const { t } = useTranslation();
  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='mb-8'>
        <Link to='/'>
          {/* <img src={theme === "light" ? "/logo.svg" : "/logo-dark.svg"} alt='Cabin logo' className='w-full pt-2' /> */}
          <img src={"/logo.svg"} alt='Cabin logo' className='w-full h-24 pt-2' />
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
                      <span>{t(item.title)}</span>
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
        <Button
          variant='secondary'
          disabled={isLoading}
          onClick={logout}
          className='flex items-center justify-start w-full py-1 px-2'
        >
          <LogOut size={18} />
          <span>{t("sidebarLogout")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
