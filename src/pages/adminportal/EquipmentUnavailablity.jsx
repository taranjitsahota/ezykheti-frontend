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

const EquipmentUnavailablity = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [partners, setPartners] = useState([]);
  const [equipment, setEquipment] = useState([]);
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
        url: `/equipment-unavailabilities/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Equipment Unavailability deleted successfully!");
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
    let start_at, end_at;

    if (formData.leave_type === "single_day") {
      // full day leave
      start_at = `${formData.date} 06:00:00`;
      end_at = `${formData.date} 22:00:00`;
    } else if (formData.leave_type === "shift") {
      if (formData.shift === "first") {
        start_at = `${formData.date} 06:00:00`;
        end_at = `${formData.date} 13:00:00`;
      } else {
        start_at = `${formData.date} 13:00:00`;
        end_at = `${formData.date} 22:00:00`;
      }
    } else if (formData.leave_type === "long_leave") {
      start_at = `${formData.start_date} 06:00:00`;
      end_at = `${formData.end_date} 22:00:00`;
    }

    const data = {
      partner_id: formData.partner_id,
      unit_id: formData.unit_id,
      reason: formData.reason,
      leave_type: formData.leave_type,
      shift: formData.shift || null,
      start_at,
      end_at,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/equipment-unavailabilities/${formData.id}` // replace with your actual edit API URL
          : "/equipment-unavailabilities",
        method: isEditMode ? "put" : "post",
        data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Equipment Unavailability updated successfully!"
            : "Equipment Unavailability created successfully!"
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

  const fetchEquipmentByPartner = async (partnerId) => {
    if (!partnerId) {
      setEquipment([]);
      return;
    }
    try {
      const response = await apiRequest({
        url: `/equipment-units-by-partner-id/${partnerId}`,
        method: "get",
      });

      if (response.success ?? response.status) {
        setEquipment(Array.isArray(response.data) ? response.data : []);
      } else {
        toast.error(response.message || "Failed to fetch equipments.");
        setEquipment([]);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
      setEquipment([]);
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

  const getLeaveTypeLabel = (row) => {
    if (row.leave_type === "single_day") return "Full Day Leave";
    if (row.leave_type === "long_leave") return "Long Leave";

    if (row.leave_type === "shift") {
      if (row.shift === "first") return "First Half Leave (6 AM – 1 PM)";
      if (row.shift === "second") return "Second Half Leave (1 PM – 10 PM)";
    }

    return "-";
  };

  const [loading, setLoading] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState("");

  const columns = [
    {
      field: "serial",
      headerName: "S.No.",
      width: 0,
      sortable: false,
      flex: 1,
      minWidth: 1,
    },
    { field: "partner_name", headerName: "Partner Name", width: 150 },
    {
      field: "equipment_type_name",
      headerName: "Equipment Type Name",
      width: 150,
    },
    // { field: "substation_name", headerName: "Substation Name", width: 1 , flex: 1,
    //   minWidth: 2 },

    { field: "serial_no", headerName: "Serial No", width: 200 },
    { field: "start_at", headerName: "Start At", width: 150 },
    { field: "end_at", headerName: "End At", width: 150 },
    {
      field: "leave_type",
      headerName: "Leave Type",
      width: 200,
      renderCell: (params) => getLeaveTypeLabel(params.row),
      flex: 1,
      minWidth: 230,
    },
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

              setFormData({
                ...row,
                date:
                  row.leave_type === "single_day" || row.leave_type === "shift"
                    ? row.start_at
                    : "",
                start_date: row.leave_type === "long_leave" ? row.start_at : "",
                end_date: row.leave_type === "long_leave" ? row.end_at : "",
                shift: row.leave_type === "shift" ? row.shift : "",
              });

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
        url: "/equipment-unavailabilities",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(
          response.message || "Failed to fetch equipment unavailabilities."
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

  const equipmentUnavailabilityFormContent = (
    <>
      <TextField
        select
        label="Partner"
        name="partner_id"
        value={formData.partner_id || ""}
        onChange={(e) => {
          const partnerId = e.target.value;
          setFormData((prev) => ({
            ...prev,
            partner_id: partnerId,
            equipment_id: "", // reset equipment
          }));
          if (partnerId) {
            fetchEquipmentByPartner(partnerId);
          } else {
            // if superadmin hasn't chosen service yet, clear equipments
            setEquipment([]);
          }
        }}
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
        label="Equipment Type"
        name="unit_id"
        fullWidth
        required
        value={formData.unit_id || ""}
        onChange={(e) => {
          setFormData({ ...formData, unit_id: e.target.value });
        }}
        disabled={!formData.partner_id}
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((equip) => (
            <MenuItem key={equip.id} value={equip.id}>
              {equip.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No equipment found for the selected partner</MenuItem>
        )}
      </TextField>

      {/* Leave Type */}
      <TextField
        select
        label="Leave Type"
        value={formData.leave_type || ""}
        onChange={(e) =>
          setFormData({ ...formData, leave_type: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value="single_day">Single Day</MenuItem>
        <MenuItem value="shift">Single Day (Shift)</MenuItem>
        <MenuItem value="long_leave">Long Leave (Date Range)</MenuItem>
      </TextField>

      {/* Conditional Fields */}
      {formData.leave_type === "single_day" && (
        <TextField
          type="date"
          label="Date"
          value={formData.date || ""}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      )}

      {formData.leave_type === "shift" && (
        <>
          <TextField
            type="date"
            label="Date"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Shift"
            value={formData.shift || ""}
            onChange={(e) =>
              setFormData({ ...formData, shift: e.target.value })
            }
            fullWidth
            required
          >
            <MenuItem value="first">First Half (6AM – 1PM)</MenuItem>
            <MenuItem value="second">Second Half (1PM – 10PM)</MenuItem>
          </TextField>
        </>
      )}

      {formData.leave_type === "long_leave" && (
        <>
          <TextField
            type="date"
            label="Start Date"
            value={formData.start_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            value={formData.end_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

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

  const equipmentUnavailabilityFormContentEdit = (
    <>
      <TextField
        select
        label="Partner"
        name="partner_id"
        value={formData.partner_id || ""}
        onChange={(e) => {
          const partnerId = e.target.value;
          setFormData((prev) => ({
            ...prev,
            partner_id: partnerId,
            equipment_id: "", // reset equipment
          }));
          if (partnerId) {
            fetchEquipmentByPartner(partnerId);
          } else {
            // if superadmin hasn't chosen service yet, clear equipments
            setEquipment([]);
          }
        }}
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
        label="Equipment Type"
        name="unit_id"
        fullWidth
        required
        value={formData.unit_id || ""}
        onChange={(e) => {
          setFormData({ ...formData, unit_id: e.target.value });
        }}
        disabled={!formData.partner_id}
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((equip) => (
            <MenuItem key={equip.id} value={equip.id}>
              {equip.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No equipment found for the selected partner</MenuItem>
        )}
      </TextField>

      {/* Leave Type */}
      <TextField
        select
        label="Leave Type"
        value={formData.leave_type || ""}
        onChange={(e) =>
          setFormData({ ...formData, leave_type: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value="single_day">Single Day</MenuItem>
        <MenuItem value="shift">Single Day (Shift)</MenuItem>
        <MenuItem value="long_leave">Long Leave (Date Range)</MenuItem>
      </TextField>

      {/* Conditional Fields */}
      {formData.leave_type === "single_day" && (
        <TextField
          type="date"
          label="Date"
          value={formData.date || ""}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      )}

      {formData.leave_type === "shift" && (
        <>
          <TextField
            type="date"
            label="Date"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Shift"
            value={formData.shift || ""}
            onChange={(e) =>
              setFormData({ ...formData, shift: e.target.value })
            }
            fullWidth
            required
          >
            <MenuItem value="first">First Half (6AM – 1PM)</MenuItem>
            <MenuItem value="second">Second Half (1PM – 10PM)</MenuItem>
          </TextField>
        </>
      )}

      {formData.leave_type === "long_leave" && (
        <>
          <TextField
            type="date"
            label="Start Date"
            value={formData.start_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            value={formData.end_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

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
      pageTitle="Equipment Unavailability"
      add="Add Equipment Unavailability"
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
              ? equipmentUnavailabilityFormContent
              : equipmentUnavailabilityFormContentEdit
          }
          add={
            drawerOpen === "add"
              ? "Add Equipment Unavailability"
              : "Edit Equipment Unavailability"
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

export default EquipmentUnavailablity;
