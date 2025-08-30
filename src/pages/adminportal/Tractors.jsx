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

const Tractors = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [partners, setPartners] = useState([]);
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
        url: `/tractors/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Tractor deleted successfully!");
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
      name: formdata.name,
      partner_id: formdata.partner_id,
      registration_no: formdata.registration_no,
      status: formdata.status,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/tractors/${formData.id}` // replace with your actual edit API URL
          : "/tractors",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              name: formData.name,
              partner_id: formData.partner_id,
              registration_no: formData.registration_no,
              status: formData.status,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Tractor updated successfully!"
            : "Tractor created successfully!"
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
    const fetchPartners = async () => {
      try {
        const response = await apiRequest({
          url: `/partners`,
          method: "get",
        });

        if (response.success) {
          setPartners(response.data);
        } else {
          toast.error(response.message || "Failed to fetch partners.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch partners.";
        toast.error(msg);
      }
    };

    fetchPartners();
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
    { field: "partner_name", headerName: "Partner Name", width: 150 },
    { field: "name", headerName: "Tractor Name", width: 150 },
    { field: "registration_no", headerName: "Registration No", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
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
        url: "/tractors",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch tractors.");
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

  const tractorCompanies = [
    "Mahindra Tractors",
    "Swaraj Tractors",
    "John Deere India",
    "New Holland Agriculture",
    "Massey Ferguson (TAFE)",
    "Eicher Tractors",
    "Sonalika Tractors",
    "Farmtrac",
    "Powertrac",
    "Kubota",
    "Escorts Agri Machinery",
    "Preet Tractors",
    "Solis Tractors",
    "ACE Tractors",
    "Indo Farm Tractors",
    "Same Deutz-Fahr (SDF) India",
    "Captain Tractors",
    "VST Shakti Tractors",
    "Agri King Tractors",
    "AutoNXT Electric Tractors",
    "Force Motors (Balwan Tractors)",
  ];

  const tractorFormContent = (
    <>
      <TextField
        select
        label="Partner"
        name="partner_id"
        value={formData.partner_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, partner_id: e.target.value })
        }
        fullWidth
        required
      >
        {partners.length > 0 ? (
          partners.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No partners found</MenuItem>
        )}
      </TextField>

      <TextField
        select
        label="Tractor Name"
        name="name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
      >
        {tractorCompanies.map((company) => (
          <MenuItem key={company} value={company}>
            {company}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Registration No"
        name="registration_no"
        type="text"
        placeholder="Enter registration no"
        value={formData.registration_no || ""}
        onChange={(e) =>
          setFormData({ ...formData, registration_no: e.target.value })
        }
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        select
        label="Status"
        name="status"
        value={formData.status || "active"} // default "active"
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        fullWidth
        required
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="maintenance">Maintenance</MenuItem>
        <MenuItem value="retired">Retired</MenuItem>
      </TextField>
    </>
  );

  const tractorFormContentEdit = (
    <>
      <TextField
        select
        label="Partner"
        name="partner_id"
        value={formData.partner_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, partner_id: e.target.value })
        }
        fullWidth
        required
      >
        {partners.length > 0 ? (
          partners.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No partners found</MenuItem>
        )}
      </TextField>

      <TextField
        label="Tractor Name"
        name="name"
        type="text"
        placeholder="Enter tractor name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Registration No"
        name="registration_no"
        type="text"
        placeholder="Enter registration no"
        value={formData.registration_no || ""}
        onChange={(e) =>
          setFormData({ ...formData, registration_no: e.target.value })
        }
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        select
        label="Status"
        name="status"
        value={formData.status || "active"} // default "active"
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        fullWidth
        required
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="maintenance">Maintenance</MenuItem>
        <MenuItem value="retired">Retired</MenuItem>
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Tractors"
      add="Add Tractor"
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
            drawerOpen === "add" ? tractorFormContent : tractorFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Tractor" : "Edit Tractor"}
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

export default Tractors;
