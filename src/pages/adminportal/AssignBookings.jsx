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
  const [partners, setPartners] = useState([]);
  const [equipmentUnits, setEquipmentUnits] = useState([]);
  const [tractors, setTractors] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await apiRequest({
          url: "/partners",
          method: "get",
        });
        if (response.success) {
          setPartners(response.data);
        } else {
          console.error("Failed to fetch partners:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch partners", error);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    if (!formData?.partner_id) return;

    const fetchData = async () => {
      try {
        // 1. Fetch Drivers
        const driverRes = await apiRequest({
          url: `/driver-by-partner/${formData.partner_id}`,
          method: "get",
        });
        if (driverRes.success) setDrivers(driverRes.data);

        // 2. Fetch Tractors
        const tractorRes = await apiRequest({
          url: `/tractor-by-partner/${formData.partner_id}`,
          method: "get",
        });
        if (tractorRes.success) setTractors(tractorRes.data);

        // 3. Fetch Equipment Units
        const equipmentRes = await apiRequest({
          url: `/equipment-units-by-partner-id/${formData.partner_id}`,
          method: "get",
        });
        if (equipmentRes.success) setEquipmentUnits(equipmentRes.data);
      } catch (error) {
        console.error("Error fetching partner-related data", error);
      }
    };

    fetchData();
  }, [formData?.partner_id]);

  const handleSubmit = async (formdata) => {
    const data = {
      partner_id: formdata?.partner_id,
      tractor_id: formdata?.tractor_id,
      equipment_unit_id: formdata?.equipment_unit_id,
      driver_id: formdata?.driver_id,
      booking_id: formdata?.booking_id,
      admin_note: formdata?.admin_note,
    };

    try {
      setSubmitLoading(true);
      const response = await apiRequest({
        url: `/assign-booking`,
        method: "put",
        data: data,
      });

      if (response.success) {
        toast.success("Booking Assigned successfully!");
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
          label="Email"
          value={formData?.email || "--"}
          disabled
          style={{ flex: 1 }}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          value={formData?.phone || ""}
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
          label="Slot Date"
          fullWidth
          value={formData?.date || "-"}
          margin="normal"
          disabled
        />
        <TextField
          label="Duration (Minutes)"
          fullWidth
          value={formData?.duration || ""}
          margin="normal"
          disabled
        />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="Start Time"
          fullWidth
          value={formData?.start_time || ""}
          margin="normal"
          disabled
        />
        <TextField
          label="End Time"
          fullWidth
          value={formData?.end_time || ""}
          margin="normal"
          disabled
        />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          label="Area"
          fullWidth
          value={formData?.area || ""}
          margin="normal"
          disabled
        />
        <TextField
          label="Substation"
          fullWidth
          value={formData?.substation || ""}
          margin="normal"
          disabled
        />
      </div>
      <TextField
        label="Booking Status"
        fullWidth
        value={formData?.booking_status || ""}
        margin="normal"
        disabled
      />

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
            onClick={() => {
              if (formData?.lattitude && formData?.longitude) {
                const url = `https://www.google.com/maps?q=${formData.lattitude},${formData.longitude}`;
                window.open(url, "_blank");
              } else {
                alert("Location not available");
              }
            }}
          >
            View Full Map
          </Button>
        </Grid>
      </Grid>
      {/* Right Block: Assign Partner */}
      {/* <Grid item xs={12} sm={6}> */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
        Assign Partner
      </Typography>

      <TextField
        select
        fullWidth
        name="partner_id"
        value={formData?.partner_id || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, partner_id: e.target.value }))
        }
      >
        {partners.length === 0 ? (
          <MenuItem value="" disabled>
            No partners found
          </MenuItem>
        ) : (
          partners.map((partner) => (
            <MenuItem key={partner.id} value={partner.id}>
              {partner.name}
            </MenuItem>
          ))
        )}
      </TextField>
      <TextField
        select
        fullWidth
        name="driver_id"
        value={formData?.driver_id || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, driver_id: e.target.value }))
        }
      >
        {drivers.length === 0 ? (
          <MenuItem value="" disabled>
            No drivers found
          </MenuItem>
        ) : (
          drivers.map((driver) => (
            <MenuItem key={driver.id} value={driver.id}>
              {driver.driver_name}
            </MenuItem>
          ))
        )}
      </TextField>
      <TextField
        select
        fullWidth
        name="equipment_unit_id"
        value={formData?.equipment_unit_id || ""}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            equipment_unit_id: e.target.value,
          }))
        }
      >
        {equipmentUnits.length === 0 ? (
          <MenuItem value="" disabled>
            No equipments found
          </MenuItem>
        ) : (
          equipmentUnits.map((equipment) => (
            <MenuItem key={equipment.id} value={equipment.id}>
              {equipment.label}
            </MenuItem>
          ))
        )}
      </TextField>
      <TextField
        select
        fullWidth
        name="tractor_id"
        value={formData?.tractor_id || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, tractor_id: e.target.value }))
        }
      >
        {equipmentUnits.length === 0 ? (
          <MenuItem value="" disabled>
            No tractors found
          </MenuItem>
        ) : (
          tractors.map((tractor) => (
            <MenuItem key={tractor.id} value={tractor.id}>
              {tractor.name}
            </MenuItem>
          ))
        )}
      </TextField>
      {/* </Grid> */}
      <input
        type="hidden"
        name="booking_id"
        value={formData?.booking_id || formData?.id || ""}
      />

      {/* Admin Notes */}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          name="admin_note"
          label="Admin Notes"
          placeholder="Enter any internal instructions to driver..."
          multiline
          minRows={3}
          defaultValue={formData?.admin_note || ""}
        />
      </Box>

      {/* Payments */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Payments
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: 2,
          columnGap: 3,
        }}
      >
        <Typography>
          Amount: <strong>₹{formData?.amount || "0"}</strong>
        </Typography>
        <Typography>
          Mode: <strong>{formData?.payment_method || "N/A"}</strong>
        </Typography>
        <Typography>
          Status: <strong>{formData?.payment_status || "Pending"}</strong>
        </Typography>
        <Typography>
          Paid At: <strong>{formData?.paid_at || "-"}</strong>
        </Typography>
      </Box>
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
