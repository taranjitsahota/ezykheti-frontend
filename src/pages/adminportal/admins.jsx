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

const Admins = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [substation, setSubstation] = useState([]);
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
        url: `/users/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Admin deleted successfully!");
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
      email: formdata?.email,
      contact_number: formdata?.contact_number,
      substation_id: formdata?.substation_id,
      password: formdata?.password,
      password_confirmation: formdata?.confirm_password,
      role: "admin",
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/users/${formData.id}` // replace with your actual edit API URL
          : "/register-superadmin-admin",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              name: formData.name,
              email: formData.email,
              contact_number: formData.contact_number,
              substation_id: formData.substation_id,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Admin updated successfully!"
            : "Admin created successfully!"
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
        const msg =
          error?.response?.data?.message || "Failed to fetch substations.";
        toast.error(msg);
      }
    };

    fetchSubstation();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact_number", headerName: "Contact", width: 150 },
    { field: "substation", headerName: "Substation", width: 150 },
    { field: "role", headerName: "Role", width: 100 },
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

  const adminFormContent = (
    <>
      <TextField
        label="Name"
        placeholder="Enter name"
        name="name"
        fullWidth
        required
      />
      <TextField
        label="Email"
        placeholder="Enter email"
        name="email"
        type="email"
        fullWidth
        // margin="normal"
        required
      />
      <TextField
        placeholder="Enter contact number"
        label="Contact Number"
        name="contact_number"
        fullWidth
        // margin="normal"
        required
        //  inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
      />
      <TextField
        select
        label="Substation"
        name="substation_id"
        value={formData.substation_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, substation_id: e.target.value })
        }
        fullWidth
        required
      >
        {substation.map((sub) => (
          <MenuItem key={sub.id} value={sub.id}>
            {sub.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="Enter Password"
        label="Password"
        name="password"
        fullWidth
        required
        type={showPassword ? "text" : "password"}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          className: "admin-textfield",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                className="ml-2 cursor-pointer right-2"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-600" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          className: "admin-label",
          shrink: true,
        }}
      />

      <TextField
        placeholder="Confirm Password"
        label="Confirm Password"
        name="confirm_password"
        fullWidth
        required
        type={showConfirmPassword ? "text" : "password"}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          className: "admin-textfield",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                className="ml-2 cursor-pointer right-2"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-600" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          className: "admin-label",
          shrink: true,
        }}
      />

      {/* <FormControlLabel
        control={
          <Checkbox
            name="role"
            required
            sx={{
              color: "var(--menu-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          />
        }
        label={<span className="admin-label">Role</span>}
      /> */}
      {/* <FormControl fullWidth required variant="standard">
        <InputLabel className="admin-label" shrink>
          Role
        </InputLabel>
        <Select
          name="role"
          displayEmpty
          disableUnderline
          className="admin-textfield"
          defaultValue=""
        >
          <MenuItem value="" disabled>
            Select a role
          </MenuItem>
          <MenuItem value="superadmin">Super Admin</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Driver</MenuItem>
          <MenuItem value="editor">User</MenuItem>
        </Select>
      </FormControl> */}
    </>
  );

  const adminFormContentEdit = (
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
        label="Email"
        placeholder="Enter email"
        name="email"
        type="email"
        defaultValue={formData.email || ""}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        fullWidth
        required
      />
      <TextField
        placeholder="Enter contact number"
        label="Contact Number"
        name="contact_number"
        defaultValue={formData.contact_number || ""}
        onChange={(e) =>
          setFormData({ ...formData, contact_number: e.target.value })
        }
        fullWidth
        required
      />
      <TextField
        select
        label="Substation"
        name="substation_id"
        value={formData.substation_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, substation_id: e.target.value })
        }
        fullWidth
        required
      >
        {substation.map((sub) => (
          <MenuItem key={sub.id} value={sub.id}>
            {sub.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Admins"
      add="Add Admin"
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
            drawerOpen === "add" ? adminFormContent : adminFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Admin" : "Edit Admin"}
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

export default Admins;
