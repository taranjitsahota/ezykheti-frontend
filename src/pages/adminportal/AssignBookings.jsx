import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import Anchor from "../../components/adminportal/Anchor"; // Import the Anchor component
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AssignBookings = () => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contact_number', headerName: 'Contact', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
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
      <TextField label="Name" name="name" fullWidth margin="normal" required />
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contact Number"
        name="contact_number"
        fullWidth
        margin="normal"
        required
      />
      <TextField label="Role" name="role" fullWidth margin="normal" required />
    </>
  );



  return (
    <DashboardLayout pageTitle="Admins" add="add admin" formContent={adminFormContent}>
     
      <BasicTable  rows={rows} columns={columns} loading={loading}/>

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

export default AssignBookings;
