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
    const data = {
      unit_id: formdata.unit_id,
      start_at: formdata.start_at,
      end_at: formdata.end_at,
      reason: formdata.reason,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/equipment-unavailabilities/${formData.id}` // replace with your actual edit API URL
          : "/equipment-unavailabilities",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              start_at: formData.start_at,
              end_at: formData.end_at,
              reason: formData.reason,
            }
          : data,
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
    { field: "tractor_name", headerName: "Tractor Name", width: 150 },
    {
      field: "equipment_type_name",
      headerName: "Equipment Type Name",
      width: 150,
    },
    { field: "substation_name", headerName: "Substation Name", width: 150 },

    { field: "serial_no", headerName: "Serial No", width: 200 },
    { field: "start_at", headerName: "Start At", width: 150 },
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
            equipment_id: "", // reset equipment on change
          }));
          if (partnerId) {
            fetchEquipmentByPartner(partnerId);
          } else {
            setEquipment([]);
          }
        }}
        fullWidth
        required
        disabled // 👈 if you don’t want to allow editing partner in edit mode
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
        disabled={!formData.partner_id} // or `disabled` if not editable
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((equip) => (
            <MenuItem key={equip.id} value={equip.id}>
              {equip.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            No equipment found for the selected partner
          </MenuItem>
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
