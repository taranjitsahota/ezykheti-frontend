import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import { countryCodes } from "../../data/countryCodes";

const TractorUnavailability = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [tractors, setTractors] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setFormData({}); // ✅ reset form
    }
    setDrawerOpen(value);
  };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/tractor-unavailabilities/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Tractor Unavailability deleted successfully!");
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
      tractor_id: formdata.id,
      start_at: formdata.start_at,
      end_at: formdata.end_at,
      reason: formdata.reason,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/tractor-unavailabilities/${formData.id}` // replace with your actual edit API URL
          : "/tractor-unavailabilities",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              tractor_id: formData.tractor_id,
              start_at: formData.start_at,
              end_at: formData.end_at,
              reason: formData.reason,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Tractor Unavailability updated successfully!"
            : "Tractor Unavailability created successfully!"
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

  useEffect(() => {
    const fetchTractors = async () => {
      try {
        const response = await apiRequest({
          url: `/tractors`,
          method: "get",
        });

        if (response.success) {
          setTractors(response.data);
        } else {
          toast.error(response.message || "Failed to fetch tractors.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch tractors.";
        toast.error(msg);
      }
    };

    fetchTractors();
  }, []);

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
    { field: "user_name", headerName: "Partner Name", width: 150 },
    { field: "tractor_name", headerName: "Tractor Name", width: 150 },
    { field: "start_at", headerName: "Start At", width: 200 },
    { field: "end_at", headerName: "End At", width: 150 },
    { field: "reason", headerName: "Reason", width: 150 },
    {
      field: "action",
      headerName: "Action Button",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-2 h-full">
          <button
            onClick={() => {
              setIsEditMode(true);
              const row = params.row;

              // Try to split phone
              const matchedCode = countryCodes.find((c) =>
                row.phone?.startsWith(c.code)
              );

              if (matchedCode) {
                setFormData({
                  ...row,
                  country_code: matchedCode.code,
                  phone: row.phone.slice(matchedCode.code.length),
                });
              } else {
                setFormData({
                  ...row,
                  country_code: "",
                  phone: row.phone,
                });
              }
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
        url: "/tractor-unavailabilities",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(
          response.message || "Failed to fetch partners unavailabilities."
        );
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

  const tractorUnavailabilityFormContent = (
    <>
      <TextField
        select
        label="Tractor"
        name="id"
        value={formData.id || ""}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        fullWidth
        required
      >
        {tractors.length > 0 ? (
          tractors.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No tractors found</MenuItem>
        )}
      </TextField>
      

      <TextField
        label="Start Date"
        name="start_at"
        type="date"
        value={formData.start_at || ""}
        onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="End At"
        name="end_at"
        type="date"
        value={formData.end_at || ""}
        onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Reason"
        name="reason"
        placeholder="Enter reason"
        value={formData.reason || ""}
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        fullWidth
        multiline
        rows={3}
        required
      />
    </>
  );

  const tractorUnavailabilityFormContentEdit = (
    <>
      <TextField
        select
        label="Tractor"
        name="tractor_id"
        value={formData.tractor_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, tractor_id: e.target.value })
        }
        fullWidth
        required
      >
        {tractors.length > 0 ? (
          tractors.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No tractors found</MenuItem>
        )}
      </TextField>

      <TextField
        label="Start At"
        name="start_at"
        type="date"
        value={formData.start_at || ""}
        onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="End At"
        name="end_at"
        type="date"
        value={formData.end_at || ""}
        onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Reason"
        name="reason"
        placeholder="Enter reason"
        value={formData.reason || ""}
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        fullWidth
        multiline
        rows={3}
        required
      />
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Tractor Unavailability"
      add="Add Tractor Unavailability"
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
              ? tractorUnavailabilityFormContent
              : tractorUnavailabilityFormContentEdit
          }
          add={
            drawerOpen === "add"
              ? "Add Tractor Unavailability"
              : "Edit Tractor Unavailability"
          }
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />

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

        <BasicTable rows={rowsWithSerial} columns={columns} loading={loading} />
      </div>
    </DashboardLayout>
  );
};

export default TractorUnavailability;
