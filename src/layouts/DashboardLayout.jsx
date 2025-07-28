import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/adminportal/Sidebar";
import Header from "../components/adminportal/Header";
import { Filter } from "lucide-react";
import { Circle, Plus } from "lucide-react";
import Anchor from "../components/adminportal/Anchor";

const DashboardLayout = ({
  children,
  pageTitle = "Dashboard",
  add = "add",
  showAddButton = true,
  showFilterButton = true,
  drawerOpen,
  toggleDrawer,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("button[data-sidebar-toggle]")
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col min-h-screen admin-wrapper bg-[var(--light-bg-color)]">
        <Header toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 p-6 overflow-y-auto ${
            drawerOpen ? "opacity-md transition-filter duration-300" : ""
          }`}
          style={{ opacity: 1 }}
        >
          <div
            className={`transition-all ${
              drawerOpen ? "transform translate-x-0" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="relative inline-block">
                <h1 className="text-3xl text-gray-900">{pageTitle}</h1>
                <div className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--warning-color)] w-full rounded-full"></div>
              </div>

              <div className="flex gap-4">
                {showAddButton && (
                  <span
                    className="flex rounded-full px-4 py-2 hover:text-white border border-gray-300 cursor-pointer items-center gap-2"
                    onClick={() => toggleDrawer("add")}
                  >
                    <Circle className="w-5 h-5 text-[var(--warning-color)]">
                      <Plus />
                    </Circle>
                    <span className="text-sm font-medium text-gray-900">
                      {add}
                    </span>{" "}
                  </span>
                )}
                {/* <Anchor
                  open={open}
                  toggleDrawer={toggleDrawer}
                  formContent={formContent}
                  add={add}
                  handleSubmit={handleSubmit}
                  loading={submitLoading}
                /> */}
                {showFilterButton && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:text-white border border-gray-300 cursor-pointer transition-colors duration-200">
                    <Filter className="w-4 h-4 text-[var(--warning-color)]" />
                    <span className="text-sm font-medium text-gray-900">
                      Filter
                    </span>
                  </button>
                )}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
