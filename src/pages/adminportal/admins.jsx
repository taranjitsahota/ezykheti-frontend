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

const Admins = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);


    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      contact_number: formData.get("contact_number"),
      password: formData.get("password"),
      password_confirmation: formData.get("confirm_password"),
      role: "admin",
    };

    try {
      setSubmitLoading(true);
      const response = await apiRequest({
        url: "/register-superadmin-admin",
        method: "post",
        data,
      });

      if (response.success) {
        toast.success("Admin created successfully!");
        setDrawerOpen(false);
        handleAdminList(); // refresh the table
      } else {
        toast.error(response.message || "Failed to create admin.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact_number", headerName: "Contact", width: 150 },
    { field: "role", headerName: "Role", width: 100 },
  ];

  const token = localStorage.getItem("auth_token");
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
      />
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
                className="ml-2 cursor-pointer"
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
                className="ml-2 cursor-pointer"
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

  return (
    <DashboardLayout
      pageTitle="Admins"
      add="Add Admin"
      formContent={adminFormContent}
      handleSubmit={handleFormSubmit}
      submitLoading={submitLoading}
    >
      <BasicTable rows={rows} columns={columns} loading={loading} />

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

export default Admins;
