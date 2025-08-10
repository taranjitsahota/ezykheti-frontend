import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import CollapsibleTable from "../../components/adminportal/CollapsibleTable";

const Bookings = () => {

  const [rows, setRows] = React.useState([]);

  const rowsWithSerial = rows.map((row, index) => ({
    ...row,
    serial: index + 1, // add serial field
  }));

  const [loading, setLoading] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState("");

  const columns = [
    {
      field: "serial",
      headerName: "S.No.",
      width: 80,
      sortable: false,
    },
    { field: "user_name", headerName: "Name", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "crop_name", headerName: "Crop Name", width: 150 },
    { field: "equipment_name", headerName: "Service Name", width: 150 },
    { field: "date", headerName: "Booking Date", width: 150 },
    { field: "start_time", headerName: "Start Time", width: 150 },
    { field: "end_time", headerName: "End Time", width: 150 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "payment_status", headerName: "Payment Status", width: 150 },
    { field: "booking_status", headerName: "Booking Status", width: 150 },
    {field: "created_at", headerName: "Requested Date", width: 150},
  ];

  const handleAdminList = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/get-all-bookings",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch bookings.");
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
    <DashboardLayout
    showAddButton={false}
    showFilterButton={false}
      pageTitle="Bookings"
      add="Add Admin"
      toggleDrawer={false}
      drawerOpen={false}
      submitLoading={false}

    >
      <div
        className={`flex-1 overflow-y-auto ${
          drawerOpen ? "opacity-md transition-filter duration-300" : ""
        }`}
        style={{ opacity: 1 }}
      >


        {/* <BasicTable rows={rowsWithSerial} columns={columns} loading={loading} /> */}
        <div className="bg-white" >
        <CollapsibleTable rows={rows} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
