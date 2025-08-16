import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import { Clock } from "lucide-react";

const BusinessTimings = () => {
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState([]);
  const [updatedTimings, setUpdatedTimings] = useState({}); // store changes

  // Fetch all timings
  const fetchTimings = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({ url: "/business-timings", method: "get" });
      if (response.success) setTimings(response.data);
      else toast.error(response.message || "Failed to fetch timings.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading timings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  // Handle time changes for individual day
  const handleTimingChange = (day, field, value) => {
    setUpdatedTimings((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value, is_available: prev[day]?.is_available ?? true },
    }));
  };

  // Toggle availability
  const handleToggleAvailable = (day) => {
    setUpdatedTimings((prev) => ({
      ...prev,
      [day]: { ...prev[day], is_available: !(prev[day]?.is_available ?? true) },
    }));
  };

  // Save single day timing
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
          is_available: timingData.is_available,
        },
      });

      if (response.success) {
        toast.success("Timing updated successfully");
        fetchTimings();
        setUpdatedTimings((prev) => {
          const newState = { ...prev };
          delete newState[day];
          return newState;
        });
      } else toast.error(response.message);
    } catch {
      toast.error("Update failed");
    }
  };

  // Apply timing to all days
  const handleApplyAll = async () => {
    const allTiming = updatedTimings.all;
    if (!allTiming?.start_time || !allTiming?.end_time) {
      toast.error("Please set both start and end time.");
      return;
    }

    try {
      const response = await apiRequest({
        url: "/apply-all",
        method: "put",
        data: allTiming,
      });

      if (response.success) {
        toast.success("Timing applied to all days!");
        fetchTimings();
        setUpdatedTimings((prev) => ({ ...prev, all: {} }));
      } else toast.error(response.message);
    } catch {
      toast.error("Failed to apply timings.");
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
      submitLoading={loading}
    >
      {/* Apply to All Days Card */}
      <section className="bg-white rounded-xl shadow-sm p-5 max-w-md w-full mb-6">
        <header className="flex items-center space-x-2 text-gray-700 text-sm font-medium mb-3">
          <Clock size={16} className="text-gray-500" />
          <span>Apply Timing to All Days</span>
        </header>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="w-16 text-gray-600 text-sm">From</label>
            <input
              type="time"
              value={updatedTimings.all?.start_time || ""}
              onChange={(e) =>
                setUpdatedTimings((prev) => ({
                  ...prev,
                  all: { ...prev.all, start_time: e.target.value },
                }))
              }
              className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
            <label className="w-16 text-gray-600 text-sm">To</label>
            <input
              type="time"
              value={updatedTimings.all?.end_time || ""}
              onChange={(e) =>
                setUpdatedTimings((prev) => ({
                  ...prev,
                  all: { ...prev.all, end_time: e.target.value },
                }))
              }
              className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleApplyAll}
              className="bg-orange-400 text-white text-sm rounded-full px-8 py-1.5 hover:bg-orange-600 cursor-pointer"
            >
              Apply to All Days
            </button>
          </div>
        </div>
      </section>

      {/* Individual Day Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {timings.map((timing) => {
          const dayUpdate = updatedTimings[timing.day] || {};
          return (
            <section
              key={timing.id}
              className={`bg-white rounded-xl shadow-sm p-5 max-w-md w-full border ${
                updatedTimings[timing.day] ? "border-orange-400" : "border-transparent"
              }`}
            >
              <header className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
                  <Clock size={16} className="text-gray-500" />
                  <span>{timing.day}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dayUpdate.is_available ?? timing.is_available ?? true}
                    onChange={() => handleToggleAvailable(timing.day)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-checked:bg-green-500 rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  <span className="ml-3 text-gray-700 text-sm font-medium">Available</span>
                </label>
              </header>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  
                  <label className="w-16 text-gray-600 text-sm">From</label>
                  <input
                    type="time"
                    value={dayUpdate.start_time ?? timing.start_time}
                    onChange={(e) =>
                      handleTimingChange(timing.day, "start_time", e.target.value)
                    }
                    className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm cursor-pointer"
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
                    className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm cursor-pointer"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSave(timing.id, timing.day)}
                    className="bg-orange-400 text-white text-sm rounded-full px-8 py-1.5 hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default BusinessTimings;
