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

const Substations = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const [substations, setSubstation] = useState([]);
  const [selectedSubstationId, setSelectedSubstationId] = useState(null);

  useEffect(() => {
    const fetchSubstation = async () => {
      try {
        const response = await apiRequest({
          url: `/substations`,
          method: "get",
        });

        if (response.success) {
          setSubstation(response.data);
        } else {
          toast.error(response.message || "Failed to fetch substations.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      }
    };

    fetchSubstation();
  }, []);

  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setFormData({}); // ✅ reset form
      setSelectedSubstationId(null);
    }
    setDrawerOpen(value);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;

    try {
      const response = await apiRequest({
        url: `/substations/${id}`, // Use `id` passed to the function
        method: "put",
        data: {
          is_enabled: newStatus, // Send the toggled status
        },
      });

      if (response.success) {
        toast.success("Substation status updated successfully!");
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
        url: `/substations/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Substation deleted successfully!");
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
      name: formdata?.name,
      location: formdata?.location,
      is_enabled: formdata?.is_enabled,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode ? `/substations/${formData.id}` : "/substations",
        method: isEditMode ? "put" : "post",
        data: data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Substation updated successfully!"
            : "Substation created successfully!"
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
    { field: "name", headerName: "Substation", width: 150 },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => params.row.location || "-",
    },

    {
      field: "is_enabled",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        const isEnabled = params.row.is_enabled === 1;

        return (
          <label className="relative inline-flex items-center cursor-pointer w-16">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isEnabled}
              onChange={() => handleStatusToggle(params.row.id, isEnabled)}
            />
            <div className="w-11 h-6 bg-gray-400 peer-checked:bg-green-600 rounded-full peer-focus:ring-2 peer-focus:ring-green-500 transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
        );
      },
    },

    {
      field: "action",
      headerName: "Actions",
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
        url: "/substations",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch Substations.");
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

  const substationFormContent = (
    <>
      <TextField
        label="Substation Name"
        name="name"
        fullWidth
        required
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        fullWidth
        value={formData.location || ""}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        margin="normal"
      />

      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        value={formData.is_enabled ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: Number(e.target.value) })
        }
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  const substationFormContentEdit = (
    <>
      <TextField
        label="Substation Name"
        name="name"
        fullWidth
        required
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        fullWidth
        value={formData.location || ""}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        margin="normal"
      />

      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        defaultValue={formData.is_enabled ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: parseInt(e.target.value) })
        }
        margin="normal"
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Substations"
      add="Add Substations"
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
              ? substationFormContent
              : substationFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Substation" : "Edit Substation"}
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

export default Substations;
