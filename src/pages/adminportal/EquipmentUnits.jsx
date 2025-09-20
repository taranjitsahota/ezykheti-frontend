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
import { Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import { countryCodes } from "../../data/countryCodes";
import EquipmentType from "./EquipmentType";
import { t } from "i18next";

const EquipmentUnits = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [partners, setPartners] = useState([]);
  const [equipmentTypes, setEquipmentType] = useState([]);
  const [substations, setSubstations] = useState([]);
  // const [tractors, setTractors] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const [equipments, setEquipments] = useState([
    { equipment_type_id: "", quantity: 1 },
  ]);

  const handleEquipmentChange = (index, field, value) => {
    const updated = [...equipments];
    updated[index][field] = value;
    setEquipments(updated);
  };

  const addEquipmentRow = () => {
    setEquipments([...equipments, { equipment_type_id: "", quantity: 1 }]);
  };

  const removeEquipmentRow = (index) => {
    const updated = [...equipments];
    updated.splice(index, 1);
    setEquipments(updated);
  };

  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setEquipments([{ equipment_type_id: "", quantity: 1 }]);
      setFormData({}); // ✅ reset form
    }
    setDrawerOpen(value);
  };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/equipment-units/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Equipment Unit deleted successfully!");
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
      partner_id: formdata.partner_id,
      equipments: equipments,
      substation_id: formdata.substation_id,
      // tractor_id: formdata.tractor_id,
      status: formdata.status,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/equipment-units/${formData.id}` // replace with your actual edit API URL
          : "/equipment-units",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              partner_id: formData.partner_id,
              equipment_type_id: formData.equipment_type_id,
              substation_id: formData.substation_id,
              // tractor_id: formData.tractor_id,
              status: formData.status,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Equipment Unit updated successfully!"
            : "Equipment Unit created successfully!"
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

    const fetchEquipmentType = async () => {
      try {
        const response = await apiRequest({
          url: `/equipment-types`,
          method: "get",
        });

        if (response.success) {
          setEquipmentType(response.data);
        } else {
          toast.error(response.message || "Failed to fetch equipment types.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch equipment types.";
        toast.error(msg);
      }
    };

    const fetchSubstations = async () => {
      try {
        const response = await apiRequest({
          url: `/substations`,
          method: "get",
        });

        if (response.success) {
          setSubstations(response.data);
        } else {
          toast.error(response.message || "Failed to fetch substations.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch substations.";
        toast.error(msg);
      }
    };

    fetchPartners();
    fetchEquipmentType();
    fetchSubstations();
    // fetchTractors();
  }, []);

  // const fetchTractors = async (partnerId) => {
  //   if (!partnerId) {
  //     setTractors([]);
  //     return;
  //   }

  //   try {
  //     const response = await apiRequest({
  //       url: `/tractor-by-partner/${partnerId}`,
  //       method: "get",
  //     });

  //     if (response.success) {
  //       setTractors(response.data);
  //     } else {
  //       toast.error(response.message || "Failed to fetch tractors.");
  //     }
  //   } catch (error) {
  //     const msg = error?.response?.data?.message || "Failed to fetch tractors.";
  //     toast.error(msg);
  //   }
  // };

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
    { field: "equipment_type_name", headerName: "Equipment Name", width: 150 },
    { field: "substation_name", headerName: "Substation Name", width: 150 },
    // { field: "tractor_name", headerName: "Tractor Name", width: 150 },
    { field: "serial_no", headerName: "Serial Number", width: 200 },
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
        url: "/equipment-units",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch equipment units.");
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

  // useEffect(() => {
  //   if (formData.partner_id) {
  //     fetchTractors(formData.partner_id);
  //   }
  // }, [formData.partner_id]);

  const equipmentunitFormContent = (
    <>
      <TextField
        select
        label="Partner"
        name="partner_id"
        value={formData.partner_id || ""}
        onChange={(e) => {
          const newPartnerId = e.target.value;

          // ✅ update formData with selected partner
          setFormData({
            ...formData,
            partner_id: newPartnerId,
            tractor_id: "",
          });

          // ✅ fetch tractors for this partner immediately
          fetchTractors(newPartnerId);
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

      {equipments.map((eq, index) => (
        <Box key={index} display="flex" gap={2}>
          <TextField
            select
            label="Equipment Type"
            value={eq.equipment_type_id}
            onChange={(e) =>
              handleEquipmentChange(index, "equipment_type_id", e.target.value)
            }
            fullWidth
          >
            {equipmentTypes.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.equipment_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Quantity"
            value={eq.quantity}
            onChange={(e) =>
              handleEquipmentChange(index, "quantity", e.target.value)
            }
            inputProps={{ min: 1 }}
            style={{ width: "120px" }}
          />

          <Button
            onClick={() => removeEquipmentRow(index)}
            disabled={equipments.length === 1}
          >
            -
          </Button>
        </Box>
      ))}

      <Button onClick={addEquipmentRow}>+ Add Equipment</Button>

      {/* <TextField
        label="Tractor Name"
        select
        name="tractor_id"
        value={formData.tractor_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, tractor_id: e.target.value })
        }
        fullWidth
        disabled={!formData.partner_id}
        required
      >
        {tractors.length > 0 ? (
          tractors.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No tractors found</MenuItem>
        )}
      </TextField> */}

      <TextField
        select
        label="Substation Name"
        name="substation_id"
        type="text"
        value={formData.substation_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, substation_id: e.target.value })
        }
        fullWidth
        required
      >
        {substations.length > 0 ? (
          substations.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No substations found</MenuItem>
        )}
      </TextField>

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

  const equipmentunitFormContentEdit = (
    <>
      {/* Partner */}
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

      {/* Equipment Type */}
      <TextField
        select
        label="Equipment Unit"
        name="equipment_type_id"
        value={formData.equipment_type_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, equipment_type_id: e.target.value })
        }
        fullWidth
        required
      >
        {equipmentTypes.length > 0 ? (
          equipmentTypes.map((et) => (
            <MenuItem key={et.id} value={et.id}>
              {et.equipment_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No equipment types found</MenuItem>
        )}
      </TextField>

      {/* Tractor */}
      {/* <TextField
        select
        label="Tractor Name"
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
      </TextField> */}

      {/* Substation */}
      <TextField
        select
        label="Substation Name"
        name="substation_id"
        value={formData.substation_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, substation_id: e.target.value })
        }
        fullWidth
        required
      >
        {substations.length > 0 ? (
          substations.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No substations found</MenuItem>
        )}
      </TextField>

      {/* Status */}
      <TextField
        select
        label="Status"
        name="status"
        value={formData.status || "active"}
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
      pageTitle="Equipment Units"
      add="Add Equipment Unit"
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
              ? equipmentunitFormContent
              : equipmentunitFormContentEdit
          }
          add={
            drawerOpen === "add" ? "Add Equipment Unit" : "Edit Equipment Unit"
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

export default EquipmentUnits;
