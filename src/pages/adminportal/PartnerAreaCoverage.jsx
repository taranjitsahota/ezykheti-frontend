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
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

const PartnerAreaCoverage = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [partners, setPartners] = useState([]);
  const [areas, setAreas] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedAreas, setSelectedAreas] = useState([]);

  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setSelectedAreas([]);
      setFormData({}); // ✅ reset form
    }
    setDrawerOpen(value);
  };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/partner-area-coverage/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Partner area coverage deleted successfully!");
        handleAdminList(); // Refresh list of admins or any data
      } else {
        toast.error(response.message || "Failed to delete.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };

  const areaOptions = areas.map((a) => ({
    id: a.id,
    label: `${a.state_name} - ${a.district_name} - ${a.tehsil_name} - ${a.village_name}`,
  }));

  const handleSubmit = async (formdata) => {
    const data = {
      partner_id: formdata.partner_id,
      areas: selectedAreas.map((a) => a.id),
      // equipment_type_id: formdata.equipment_type_id,
      is_enabled: formdata.is_enabled,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/partner-area-coverage/${formData.id}` // replace with your actual edit API URL
          : "/partner-area-coverage",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              partner_id: formData.partner_id,
              area_id: formData.area_id,
              // equipment_type_id: formData.equipment_type_id,
              is_enabled: formData.is_enabled,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Partner area coverage updated successfully!"
            : "Partner area coverage created successfully!"
        );
        setDrawerOpen("");
        setIsEditMode(false);
        setSelectedAreas([]);
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

    const fetchArears = async () => {
      try {
        const response = await apiRequest({
          url: `/areas`,
          method: "get",
        });

        if (response.success) {
          setAreas(response.data);
        } else {
          toast.error(response.message || "Failed to fetch arears.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Failed to fetch areas.";
        toast.error(msg);
      }
    };

    fetchPartners();
    fetchArears();
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
      width: 70,
      sortable: false,
    },
    { field: "user_name", headerName: "Partner Name", width: 150 },
    { field: "area_name", headerName: "Area", flex: 1, minWidth: 380 },
    // { field: "label", headerName: "Equipment Type", width: 200 },
    // { field: "is_enabled", headerName: "Status", width: 150 },

    {
      field: "is_enabled",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const isEnabled = params.row.is_enabled === 1;

        return (
          <label className="relative inline-flex items-center cursor-pointer w-16">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isEnabled}
              onChange={() => handleStatusToggle(params.row.id, isEnabled)}
            />
            <div className="w-11 h-6 bg-gray-400 peer-checked:bg-green-600 rounded-full peer-focus:ring-2 peer-focus:ring-green-500 transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
        );
      },
    },
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

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;

    try {
      const response = await apiRequest({
        url: `/partner-area-coverage/${id}`, // Use `id` passed to the function
        method: "put",
        data: {
          is_enabled: newStatus, // Send the toggled status
        },
      });

      if (response.success) {
        toast.success("Partner area coverage status updated successfully!");
        handleAdminList(); // Refresh the list or rows
      } else {
        toast.error(response.message || "Failed to update status.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };

  const handleAdminList = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/partner-area-coverage",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(
          response.message || "Failed to fetch partner area coverage."
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

  const partnerAreaCoverageFormContent = (
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
        sx={{ mb: 1 }} 
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

      {/* <TextField
        select
        label="Equipment Type"
        name="equipment_type_id"
        fullWidth
        required
        value={formData.equipment_type_id || ""}
        onChange={(e) => {
          setFormData({ ...formData, equipment_type_id: e.target.value });
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
      </TextField> */}

      {/* <TextField
        select
        label="Area"
        name="area_id"
        value={formData.area_id || ""}
        onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
        fullWidth
        required
      >
        {areas.length > 0 ? (
          areas.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.state_name} - {p.district_name} - {p.tehsil_name} -{" "}
              {p.village_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Areas found</MenuItem>
        )}
      </TextField> */}

      <Autocomplete
        multiple
        options={areaOptions}
        getOptionLabel={(option) => option.label}
        value={selectedAreas}
        onChange={(event, value) => {
          setSelectedAreas(value);
          // if you want to also set formData.area_id for backward compatibility:
          setFormData({
            ...formData,
            area_id: value.length ? value[0].id : "",
          });
        }}
        disableCloseOnSelect
        fullWidth
        sx={{ mb: 2 }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
              // don't control the checkbox directly here — Autocomplete handles state
            />
            {option.label}
          </li>
        )}
        renderTags={(value, getTagProps) => {
          // show compact "N selected" chip when many are chosen
          if (value.length > 3) {
            return [<Chip key="count" label={`${value.length} selected`} />];
          }
          return value.map((option, index) => (
            <Chip
              label={option.label}
              {...getTagProps({ index })}
              key={option.id}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Areas"
            placeholder="Search & select areas"
            // required
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              style: { backgroundColor: "#fff", paddingTop: 8, paddingBottom: 8 }, // force white background
            }}
          />
        )}
      />

      {/* <TextField
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
      /> */}

      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        value={formData.is_enabled ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: Number(e.target.value) })
        }
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  const partnerAreaCoverageFormContentEdit = (
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
            equipment_id: "", // reset equipment on partner change
          }));
          if (partnerId) {
            fetchEquipmentByPartner(partnerId);
          } else {
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

      {/* <TextField
        select
        label="Equipment Type"
        name="equipment_type_id"
        fullWidth
        required
        value={formData.equipment_type_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, equipment_type_id: e.target.value })
        }
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
      </TextField> */}

      <TextField
        select
        label="Area"
        name="area_id"
        value={formData.area_id || ""}
        onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
        fullWidth
        required
      >
        {areas.length > 0 ? (
          areas.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.state_name} - {p.district_name} - {p.tehsil_name} -{" "}
              {p.village_name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Areas found</MenuItem>
        )}
      </TextField>

      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        defaultValue={formData.is_enabled ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: parseInt(e.target.value) })
        }
        margin="normal"
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Partner Area Coverage"
      add="Add Partner Area Coverage"
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
              ? partnerAreaCoverageFormContent
              : partnerAreaCoverageFormContentEdit
          }
          add={
            drawerOpen === "add"
              ? "Add Partner Area Coverage"
              : "Edit Partner Area Coverage"
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

export default PartnerAreaCoverage;
