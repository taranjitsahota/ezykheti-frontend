import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import Anchor from "../../components/adminportal/Anchor"; // Import the Anchor component
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BusinessTimings = () => {
    
  const handleAdminList = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/admin-list",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch admins.");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAdminList();
  }, []);





  return (
    <DashboardLayout  showAddButton={false}
    showFilterButton={false}
      pageTitle="Business Timings"
      add="Add Business Timing"
      toggleDrawer={false}
      drawerOpen={false}
      submitLoading={false}>
     
      {/* <BasicTable  rows={rows} columns={columns} loading={loading}/
      
      > */}

      
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">

    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-sun" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-sun"
            type="text"
            value="Sunday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-sun" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-sun"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-sun" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-sun"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer" />
          <div
            class="w-11 h-6 bg-green-500 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-green-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-mon" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-mon"
            type="text"
            value="Monday"
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-mon" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-mon"
            class="flex-1 rounded-md border border-gray-200 bg-white text-gray-900 text-sm px-3 py-2"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-mon" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-mon"
            class="flex-1 rounded-md border border-gray-200 bg-white text-gray-900 text-sm px-3 py-2"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f0a324] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-tue" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-tue"
            type="text"
            value="Tuesday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-tue" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-tue"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-tue" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-tue"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-wed" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-wed"
            type="text"
            value="Wednesday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-wed" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-wed"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-wed" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-wed"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-thu" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-thu"
            type="text"
            value="Thursday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-thu" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-thu"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-thu" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-thu"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-fri" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-fri"
            type="text"
            value="Friday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-fri" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-fri"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-fri" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-fri"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>


    <section class="bg-white rounded-xl shadow-sm p-5 max-w-md w-full">
      <header class="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <div class="flex items-center space-x-2 text-gray-700 text-sm font-medium">
          <i class="far fa-clock"></i>
          <span>Date and Time</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-gray-600 peer-focus:ring-2 peer-focus:ring-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-3 text-gray-700 text-sm font-medium">Available</span>
        </label>
      </header>
      <form class="space-y-3">
        <div class="flex items-center space-x-3">
          <label for="day-sat" class="w-16 text-gray-600 text-sm font-normal">Day</label>
          <input
            id="day-sat"
            type="text"
            value="Saturday"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div class="flex items-center space-x-3">
          <label for="from-sat" class="w-16 text-gray-600 text-sm font-normal">From</label>
          <select
            id="from-sat"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>09:00 AM</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <label for="to-sat" class="w-16 text-gray-600 text-sm font-normal">To</label>
          <select
            id="to-sat"
            disabled
            class="flex-1 rounded-md border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 cursor-not-allowed"
          >
            <option>06:00 PM</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-[#f9d29d] text-white text-sm rounded-full px-8 py-1.5 w-fit"
          >
            Save
          </button>
        </div>
      </form>
    </section>
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
