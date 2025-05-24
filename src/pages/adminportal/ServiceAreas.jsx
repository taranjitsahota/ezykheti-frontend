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
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";

const ServiceAreas = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});




  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setFormData({}); // ✅ reset form
    }
    setDrawerOpen(value);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;

    try {
      const response = await apiRequest({
        url: `/service-areas/${id}`, // Use `id` passed to the function
        method: "put",
        data: {
          is_enabled: newStatus, // Send the toggled status
        },
      });

      if (response.success) {
        toast.success("Service area status updated successfully!");
        handleAdminList(); // Refresh the list or rows
      } else {
        toast.error(response.message || "Failed to update status.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/service-areas/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Service area deleted successfully!");
        handleAdminList(); // Refresh list of admins or any data
      } else {
        toast.error(response.message || "Failed to delete.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };

  const handleSubmit = async (formdata) => {
    const data = {
      area_id: formdata?.area_id,
      service_id: formdata?.service_id,
      is_enabled: formdata?.is_enabled,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/service-areas/${formData.id}` // replace with your actual edit API URL
          : "/service-areas",
        method: isEditMode ? "put" : "post",
        data: data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Service area updated successfully!"
            : "Service area created successfully!"
        );
        setDrawerOpen("");
        setIsEditMode(false);
        handleAdminList();
      } else {
        toast.error(response.message || "Failed to submit.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  //   const [showPassword, setShowPassword] = useState(false);
  //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      width: 60,
      sortable: false,
    },
    { field: "area_id", headerName: "Area", width: 150 },
    { field: "service_id", headerName: "Service", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "village", headerName: "Village", width: 150 },
    { field: "service", headerName: "Service", width: 150 },
    
    {
      field: "is_enabled",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        const isEnabled = params.row.is_enabled === 1;

        return (
          <div
            className={`flex items-center rounded-full w-28 h-10 cursor-pointer transition-all duration-300 ${
              isEnabled
                ? "bg-green-700 justify-start"
                : "bg-red-700 justify-end"
            }`}
            onClick={() => handleStatusToggle(params.row.id, isEnabled)}
          >
            {isEnabled ? (
              <>
                <div
                  className="w-10 h-10 bg-gradient-to-tr from-gray-300 to-gray-100 rounded-full shadow-inner ml-0"
                  style={{
                    boxShadow:
                      "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
                  }}
                ></div>
                <span className="text-white text-base font-normal ml-4">
                  Enable
                </span>
              </>
            ) : (
              <>
                <span className="text-white text-base font-normal mr-4">
                  Disable
                </span>
                <div
                  className="w-10 h-10 bg-gradient-to-tr from-gray-300 to-gray-100 rounded-full shadow-inner mr-0"
                  style={{
                    boxShadow:
                      "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
                  }}
                ></div>
              </>
            )}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action Button",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-2 h-full">
          <button
            onClick={() => {
              setIsEditMode(true);
              setFormData(params.row); // row = your current row data
              toggleDrawer(true); // open anchor
            }}
            className="bg-[#5D9C59] text-white px-3 py-1 rounded-full text-sm cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setDeleteId(params.row.id);
              setShowConfirm(true);
            }}
            className="bg-[#D24545] text-white px-3 py-1 rounded-full text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleAdminList = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/service-areas",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch Service areas.");
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

  const serviceareasFormContent = (
    <>
      <TextField
        label="Name"
        placeholder="Enter name"
        name="name"
        fullWidth
        required
      />
      <TextField
        label="Price Per Kanal"
        placeholder="Enter price per kanal"
        name="price_per_kanal"
        type="number"
        fullWidth
        // margin="normal"
        required
      />
      <TextField
        placeholder="Enter Min Kanal"
        label="Min Kanal"
        name="min_kanal"
        type="number"
        fullWidth
        // margin="normal"
        required
        inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
      />
      <TextField
        placeholder="Enter Minutes Per Kanal"
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        type="number"
        fullWidth
        required
        variant="standard"
      />

      <TextField
        placeholder="Enter Inventory"
        label="Inventory"
        name="inventory"
        type="number"
        fullWidth
        required
      />

      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        defaultValue="" // or true / false
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  const serviceareasFormContentEdit = (
    <>
      <TextField
        label="Name"
        placeholder="Enter name"
        name="name"
        defaultValue={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
      />
      <TextField
        label="Price Per Kanal"
        placeholder="Enter price per kanal"
        name="price_per_kanal"
        defaultValue={formData.price_per_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, price_per_kanal: e.target.value })
        }
        fullWidth
        required
      />
      <TextField
        placeholder="Enter Min Kanal"
        label="Min Kanal"
        name="min_kanal"
        defaultValue={formData.min_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, min_kanal: e.target.value })
        }
        fullWidth
        required
      />
      <TextField
        placeholder="Enter Minutes Per Kanal"
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        defaultValue={formData.minutes_per_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, minutes_per_kanal: e.target.value })
        }
        fullWidth
        required
      />
      <TextField
        placeholder="Enter Inventory"
        label="Inventory"
        name="inventory"
        defaultValue={formData.inventory || ""}
        onChange={(e) =>
          setFormData({ ...formData, inventory: e.target.value })
        }
        fullWidth
        required
      />

      <TextField
        select
        label="Status"
        name="is_enabled"
        value={
          formData.is_enabled === 1
            ? true
            : formData.is_enabled === 0
            ? false
            : ""
        }
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: e.target.value === "true" })
        }
        fullWidth
        required
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Service Areas"
      add="Add Service Areas"
      toggleDrawer={toggleDrawer}
      drawerOpen={drawerOpen}
      submitLoading={submitLoading}
    >
      <div
        className={`flex-1 overflow-y-auto ${
          drawerOpen ? "opacity-md transition-filter duration-300" : ""
        }`}
        style={{ opacity: 1 }}
      >
        <Anchor
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          formContent={
            drawerOpen === "add"
              ? serviceareasFormContent
              : serviceareasFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Service Areas" : "Edit Service Areas"}
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />
                <BasicTable rows={rowsWithSerial} columns={columns} loading={loading} />
                

        <div>
          <ConfirmModal
            show={showConfirm}
            onClose={() => setShowConfirm(false)}
            message="Do you really want to delete this item?"
            buttons={[
              {
                label: "Delete",
                onClick: handleDelete,
                className: "bg-red-600 text-white hover:bg-red-700",
              },
              {
                label: "Cancel",
                onClick: () => setShowConfirm(false),
                className: "bg-gray-200 text-black hover:bg-gray-300",
              },
            ]}
          />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ServiceAreas;
