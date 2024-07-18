"use client"
import Link from "next/link";

import { BarChart4, MonitorPlay } from "lucide-react";
import { usePathname } from "next/navigation";

const InstructorSidebar = () => {
  const routes = [
    {
      icon: <MonitorPlay />,
      label: "Courses",
      href: "/instructor/courses",
    },
    {
      icon: <BarChart4 />,
      label: "Performance",
      href: "/instructor/performance",
    },
  ];
  const pathname = usePathname()
  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
      {routes.map((route, index) => (
        <Link
          href={route.href}
          key={index}
          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#FF8EB] ${pathname.startsWith(route.href) && 'bg-[#FDAB04] hover:bg-[#FDAB04]/80'}` }
        >
          {" "}
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};

export default InstructorSidebar;
