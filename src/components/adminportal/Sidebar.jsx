import { NavLink } from "react-router-dom";
// import logo from "../../assets/images/logo/Logo-Icon.png";
import logo from "../../assets/images/logo/Logo.png";

import {
  LayoutDashboard,
  Cpu,
  Tractor,
  CalendarX,
  Truck,
  CalendarDays,
  CalendarCheck2,
  CalendarPlus,
  Users,
  PenLine,
  Car,
  Radar,
  Pin,
  LocateFixed,
  Globe,
  ClipboardCheck,
  UserCheck,
  UserPlus,
  UserSearch,
  MailOpen,
  Heart,
  Share2,
  Wheat,
  TreeDeciduous,
  Sprout,
  Map,
  MapPin,
  Settings,
  Workflow,
  Sparkles,
  ListChecks,
  Cog,
  Network,
  Leaf,
  User,
  UserRound,
  UsersRound,
  Clock,
  CreditCard,
} from "lucide-react";

const Sidebar = ({ isOpen, sidebarRef, toggleSidebar }) => {
  const SteeringWheelIcon = ({ className = "w-6 h-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: "var(--warning-color)" }}
    >
      <circle cx="32" cy="32" r="28" />
      <circle cx="32" cy="32" r="6" />
      <path d="M32 6v20" />
      <path d="M22 36l-14 8" />
      <path d="M40 36l16 8" />
    </svg>
  );

  const role = localStorage.getItem("user_role");

  const allRoutes = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard />,
      label: "Dashboard",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/substations",
      icon: <Cpu />,
      label: "Substations",
      roles: ["superadmin"],
    },
    {
      to: "/areas",
      icon: <Network />,
      label: "Areas",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/services",
      icon: <Workflow />,
      label: "Services",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/equipments",
      icon: <Tractor />,
      label: "Equipments",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/partners",
      icon: <Share2 />,
      label: "Partners",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/drivers",
      icon: <SteeringWheelIcon />,
      label: "Drivers",
      roles: ["superadmin", "admin"],
    },

    {
      to: "/tractors",
      icon: <Tractor />,
      label: "Tractors",
      roles: ["superadmin", "admin"],
    },

    {
      to: "/equipment-type",
      icon: <CalendarX />,
      label: "Equipment Types",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/equipment-unit",
      icon: <CalendarX />,
      label: "Equipment Units",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/partner-area-coverage",
      icon: <CalendarX />,
      label: "Partner Area Coverage",
      roles: ["superadmin", "admin"],
    },

    {
      to: "/partner-unavailability",
      icon: <CalendarX />,
      label: "Partner Unavailabilties",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/driver-unavailability",
      icon: <CalendarX />,
      label: "Driver Unavailabilties",
      roles: ["superadmin", "admin"],
    },

    {
      to: "/tractor-unavailability",
      icon: <CalendarX />,
      label: "Tractor Unavailabilties",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/equipment-unavailability",
      icon: <CalendarX />,
      label: "Equipment Unavailabilties",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/crops",
      icon: <Sprout />,
      label: "Crops",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/bookings",
      icon: <CalendarPlus />,
      label: "Bookings",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/assign-bookings",
      icon: <UserCheck />,
      label: "Assign Bookings",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/subscriptions",
      icon: <CreditCard />,
      label: "Subscriptions",
      roles: ["superadmin"],
    },
    {
      to: "/business-timings",
      icon: <Clock />,
      label: "Business Timings",
      roles: ["superadmin"],
    },
    {
      to: "/interested-users",
      icon: <Heart />,
      label: "Interested Users",
      roles: ["superadmin"],
    },
    {
      to: "/interested-users-email",
      icon: <MailOpen />,
      label: "Interested Users Email",
      roles: ["superadmin"],
    },
    {
      to: "/admins",
      icon: <UserRound />,
      label: "Admins",
      roles: ["superadmin"],
    },

    {
      to: "/farmers",
      icon: <Users />,
      label: "farmers",
      roles: ["superadmin", "admin"],
    },
  ];

  // 🔹 Filter routes based on role
  const visibleRoutes = allRoutes.filter((route) => route.roles.includes(role));

  return (
    <aside
      ref={sidebarRef}
      className={`
    w-28 md:w-60 h-screen flex flex-col
    fixed admin-wrapper bg-[var(--sidebar-bg-color)] border-r border-[var(--border-bg-color)]
    transform transition-transform duration-300 ease-in-out z-30
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 shadow-sm
  `}
    >
      <div className="md:hidden flex justify-end p-4 z-30">
        <button onClick={toggleSidebar} data-sidebar-toggle>
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-2 flex justify-center">
        {/* Main Logo */}
        <img
          src={logo}
          alt="EzyKheti Logo"
          className="h-10 transition-all duration-300 ease-in-out group-hover:block"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-4 space-y-1">
          {visibleRoutes.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative block py-2 group/nav overflow-hidden text-center transition-colors duration-300 ${
                  isActive ? "bg-[var(--primary-color)] text-white" : ""
                }`
              }
            >
              <div className="absolute bottom-0 left-0 w-full h-0 bg-[var(--primary-color)] text-white transition-all duration-600 ease-in-out group-hover/nav:h-full text-white z-0"></div>

              <div className="relative z-10 flex items-center space-x-3 pl-4">
                <div className="text-[var(--warning-color)] text-xl">
                  {icon}
                </div>
                <span className="text-sm font-medium group-hover/nav:text-white">
                  {label}
                </span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
