import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import Anchor from "../../components/adminportal/Anchor"; // Import the Anchor component
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Clock } from "lucide-react";

const BusinessTimings = () => {
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState([]);
  const [updatedTimings, setUpdatedTimings] = useState({});

  const fetchTimings = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/business-timings",
        method: "get",
      });

      if (response.success) {
        setTimings(response.data);
      } else {
        toast.error(response.message || "Failed to fetch timings.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading timings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  const handleTimingChange = (day, field, value) => {
    setUpdatedTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleToggleAvailable = (day) => {
    setUpdatedTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        is_available: !prev[day]?.is_available,
      },
    }));
  };

  const handleSave = async (id, day) => {
    try {
      const timingData = updatedTimings[day];
      if (!timingData) return;

      const response = await apiRequest({
        url: `/business-timings/${id}`,
        method: "put",
        data: {
          day,
          start_time: timingData.start_time,
          end_time: timingData.end_time,
        },
      });

      if (response.success) {
        toast.success("Timing updated successfully");
        fetchTimings(); // refresh
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <DashboardLayout
      showAddButton={false}
      showFilterButton={false}
      pageTitle="Business Timings"
      add="Add Business Timing"
      toggleDrawer={false}
      drawerOpen={false}
      submitLoading={false}
    >
      {/* <BasicTable  rows={rows} columns={columns} loading={loading}/
      
      > */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {timings.map((timing) => {
          const dayUpdate = updatedTimings[timing.day] || {};
          return (
            <section
              key={timing.id}
              className="bg-white rounded-xl shadow-sm p-5 max-w-md w-full"
            >
              <header className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
                  <Clock size={16} className="text-gray-500" />
                  <span>Date and Time</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dayUpdate.is_available ?? true}
                    onChange={() => handleToggleAvailable(timing.day)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-checked:bg-green-500 rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  <span className="ml-3 text-gray-700 text-sm font-medium">
                    Available
                  </span>
                </label>
              </header>
              <form className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="w-16 text-gray-600 text-sm">Day</label>
                  <input
                    type="text"
                    value={timing.day}
                    disabled
                    className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <label className="w-16 text-gray-600 text-sm">From</label>
                  <input
                    type="time"
                    value={dayUpdate.start_time ?? timing.start_time}
                    onChange={(e) =>
                      handleTimingChange(
                        timing.day,
                        "start_time",
                        e.target.value
                      )
                    }
                    className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <label className="w-16 text-gray-600 text-sm">To</label>
                  <input
                    type="time"
                    value={dayUpdate.end_time ?? timing.end_time}
                    onChange={(e) =>
                      handleTimingChange(timing.day, "end_time", e.target.value)
                    }
                    className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSave(timing.id, timing.day)}
                    className="bg-orange-500 text-white text-sm rounded-full px-8 py-1.5"
                  >
                    Save
                  </button>
                </div>
              </form>
            </section>
          );
        })}
      </div>

      {/* <Button
        variant="contained"
        onClick={() => setDrawerOpen(true)}
        sx={{ mt: 2 }}
      >
        Add Admin
      </Button>
      <Anchor open={drawerOpen} toggleDrawer={setDrawerOpen} formContent={adminFormContent} /> */}
    </DashboardLayout>
  );
};

export default BusinessTimings;
