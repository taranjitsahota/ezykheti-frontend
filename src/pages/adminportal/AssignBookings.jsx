import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

const AssignBookings = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [rows, setRows] = React.useState([]);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await apiRequest({
          url: "/driver-list",
          method: "get",
        });
        setDrivers(response.data);
      } catch (error) {
        console.error("Failed to fetch drivers", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleSubmit = async (formdata) => {
    const data = {
      driver_id: formdata?.driver_id,
      booking_id: formdata?.booking_id,
      admin_note: formdata?.admin_note,
    };

    try {
      setSubmitLoading(true);
      console.log(data);
      const response = await apiRequest({
        url: `/assign-driver`,
        method: "put",
        data: data,
      });

      if (response.success) {
        toast.success("Driver Assigned successfully!");
        setDrawerOpen(false);
        setFormData({});
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

  const rowsWithSerial = rows.map((row, index) => ({
    ...row,
    serial: index + 1, // add serial field
  }));

  const [loading, setLoading] = React.useState(false);

  const columns = [
    {
      field: "serial",
      headerName: "S.No.",
      width: 80,
      sortable: false,
    },
    { field: "id", headerName: "Booking ID", width: 150 },
    { field: "user_name", headerName: "Name", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "crop_name", headerName: "Crop", width: 150 },
    { field: "equipment_name", headerName: "Equipment", width: 150 },
    { field: "date", headerName: "Booking Date", width: 150 },
    // { field: "start_time", headerName: "Start Time", width: 150 },
    // { field: "end_time", headerName: "End Time", width: 150 },
    // { field: "duration", headerName: "Duration", width: 150 },
    // { field: "amount", headerName: "Amount", width: 150 },
    // { field: "status", headerName: "Payment Status", width: 150 },
    // { field: "booking_status", headerName: "Booking Status", width: 150 },
    { field: "created_at", headerName: "Requested Date", width: 150 },
  ];

  const handleAdminList = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/get-pending-bookings",
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

  // const bookingFormContent = (
  //   <>
  //     <TextField
  //       label="Name"
  //       name="user_name"
  //       fullWidth
  //       value={formData?.user_name || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Address"
  //       name="address"
  //       fullWidth
  //       value={formData?.address || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Crop Name"
  //       name="crop_name"
  //       fullWidth
  //       value={formData?.crop_name || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Service Name"
  //       name="equipment_name"
  //       fullWidth
  //       value={formData?.equipment_name || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Booking Date"
  //       name="date"
  //       fullWidth
  //       value={formData?.date || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Start Time"
  //       name="start_time"
  //       fullWidth
  //       value={formData?.start_time || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="End Time"
  //       name="end_time"
  //       fullWidth
  //       value={formData?.end_time || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Duration"
  //       name="duration"
  //       fullWidth
  //       value={formData?.duration || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Amount"
  //       name="amount"
  //       fullWidth
  //       value={formData?.amount || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Payment Status"
  //       name="status"
  //       fullWidth
  //       value={formData?.status || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Booking Status"
  //       name="booking_status"
  //       fullWidth
  //       value={formData?.booking_status || ""}
  //       margin="normal"
  //       disabled
  //     />
  //     <TextField
  //       label="Requested Date"
  //       name="created_at"
  //       fullWidth
  //       value={formData?.created_at || ""}
  //       margin="normal"
  //       disabled
  //     />
  //   </>
  // );

  const bookingFormContent = (
    <Box>
      {/* Section Title */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Farmers Info
      </Typography>

      {/* Email */}
      <TextField
        label="Name"
        fullWidth
        value={formData?.user_name || ""}
        margin="normal"
        disabled
      />

      {/* PIN and Contact */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="PIN Code"
          value={formData?.pin_code || ""}
          disabled
          style={{ flex: 1 }}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          value={formData?.contact_number || ""}
          disabled
          style={{ flex: 1 }}
          margin="normal"
        />
      </div>

      {/* Address */}
      <TextField
        label="Address"
        fullWidth
        value={formData?.address || ""}
        margin="normal"
        disabled
        multiline
        minRows={2}
      />

      {/* Booking Details Title */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Booking Details
      </Typography>

      {/* Crop and Service */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="Crop"
          fullWidth
          value={formData?.crop_name || ""}
          margin="normal"
          disabled
        />

        <TextField
          label="Service"
          fullWidth
          value={formData?.service_name || ""}
          margin="normal"
          disabled
        />
      </div>

      {/* Equipment and Land Area */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="Equipment"
          fullWidth
          value={formData?.equipment_name || ""}
          margin="normal"
          disabled
        />
        <TextField
          label="Land Area"
          fullWidth
          value={formData?.land_area || ""}
          margin="normal"
          disabled
        />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="Start Date and Time"
          fullWidth
          value={formData?.start_time || ""}
          margin="normal"
          disabled
        />
        <TextField
          label="End Date and Time"
          fullWidth
          value={formData?.end_time || ""}
          margin="normal"
          disabled
        />
      </div>
      <TextField
        label="Notes"
        fullWidth
        value={formData?.user_note || ""}
        margin="normal"
        disabled
        multiline
        minRows={4}
      />
      {/* Section Title */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Land Location
      </Typography>

      {/* Map Preview + Assign Driver */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Block: Map Preview */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Map Preview</Typography>
          <Button
            variant="outlined"
            startIcon={<MapIcon />}
            sx={{
              mt: 1,
              backgroundColor: "#D2FFB5",
              borderColor: "#B5F59F",
              color: "#222",
              whiteSpace: "nowrap",
            }}
          >
            View Full Map
          </Button>
        </Grid>

        {/* Right Block: Assign Driver */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Assign Driver</Typography>
          <TextField
            select
            fullWidth
            name="driver_id"
            defaultValue={formData?.driver_id || ""}
          >
            <MenuItem value="">Select available driver</MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <input type="hidden" name="booking_id" value={formData?.booking_id || formData?.id || ""} />


      {/* Admin Notes */}
      <TextField
        fullWidth
        name="admin_note"
        placeholder="Enter any internal instructions to driver..."
        margin="normal"
        multiline
        minRows={3}
        defaultValue={formData?.admin_note || ""}
      />

      {/* Payments */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Payments
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>
            Amount: <strong>₹{formData?.amount || "0"}</strong>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Mode: <strong>{formData?.mode || "N/A"}</strong>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Status: <strong>{formData?.status || "Pending"}</strong>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <DashboardLayout
      showAddButton={false}
      showFilterButton={false}
      pageTitle="Assign Bookings"
      add="Assign Bookings"
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
        <BasicTable
          rows={rowsWithSerial}
          columns={columns}
          loading={loading}
          onRowClick={(rowData) => {
            setFormData(rowData);
            setDrawerOpen(true);
          }}
        />
        <Anchor
          open={drawerOpen}
          toggleDrawer={() => setDrawerOpen(!drawerOpen)}
          formContent={bookingFormContent} // or dynamic if needed
          add="Assign Booking to Driver"
          handleSubmit={handleSubmit} // define how you want to submit the form
          loading={false}
          formData={bookingFormContent}
          onClose={() => {
            setDrawerOpen(false);
            setFormData({});
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default AssignBookings;
