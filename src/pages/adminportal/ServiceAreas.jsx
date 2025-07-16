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
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";

const ServiceAreas = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const [substation, setSubstation] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await apiRequest({
          url: `/equipments`,
          method: "get",
        });

        if (response.success) {
          setEquipment(response.data);
        } else {
          toast.error(response.message || "Failed to fetch equipments.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      }
    };

    fetchEquipment();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await apiRequest({
        url: `/areas`, // Update this to match your filtered endpoint
        method: "get",
      });

      if (response.success) {
        setAreaList(response.data);
      } else {
        toast.error(response.message || "Failed to fetch areas.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
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

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedEquipmentId) return;

      try {
        const response = await apiRequest({
          url: `/service-by-equipment-id/${selectedEquipmentId}`,
          method: "get",
        });

        if (response.success) {
          setServiceList(response.data);
        } else {
          toast.error(response.message || "Failed to fetch services.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch services.";
        toast.error(msg);
      }
    };

    fetchServices();
  }, [selectedEquipmentId]);

  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setFormData({}); // ✅ reset form
      setSelectedEquipmentId(null);
    }
    setDrawerOpen(value);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;

    try {
      const response = await apiRequest({
        url: `/service-areas/${id}`, // Use `id` passed to the function
        method: "put",
        data: {
          is_enabled: newStatus, // Send the toggled status
        },
      });

      if (response.success) {
        toast.success("Service area status updated successfully!");
        handleAdminList(); // Refresh the list or rows
      } else {
        toast.error(response.message || "Failed to update status.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/service-areas/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Service area deleted successfully!");
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
      equipment_id: formdata?.equipment_id,
      area_id: formdata?.area_id,
      service_id: formdata?.service_id,
      substation_id: formdata?.substation_id,
      is_enabled: formdata?.is_enabled,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode ? `/service-areas/${formData.id}` : "/service-areas",
        method: isEditMode ? "put" : "post",
        data: data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Service area updated successfully!"
            : "Service area created successfully!"
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
      width: 60,
      sortable: false,
    },
    { field: "equipment", headerName: "Equipment", width: 150 },
    { field: "service", headerName: "Service", width: 150 },
    {
      field: "area",
      headerName: "Area (State > District > Tehsil > Village)",
      width: 250,
      renderCell: (params) => {
        const state = params.row.state || "";
        const District = params.row.district || "";
        const Tehsil = params.row.tehsil || "";
        const village = params.row.village || "";
        return <span>{`${state} > ${District} > ${Tehsil} > ${village}`}</span>;
      },
    },
    { field: "substation", headerName: "Substation", width: 150 },

    {
      field: "is_enabled",
      headerName: "Status",
      width: 180,
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
              setFormData(params.row); // row = your current row data
              setSelectedEquipmentId(params.row.equipment_id);
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
        url: "/service-areas",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch Service areas.");
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

  const serviceareasFormContent = (
    <>
      <TextField
        select
        label="Equipment"
        name="equipment_id"
        fullWidth
        required
        value={formData.equipment_id || ""}
        onChange={(e) => {
          const id = e.target.value;
          setFormData({ ...formData, equipment_id: e.target.value });
          setSelectedEquipmentId(id);
        }}
        // disabled={!selectedState}
        margin="normal"
      >
        {equipment.map((equipment) => (
          <MenuItem key={equipment.id} value={equipment.id}>
            {equipment.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Service"
        name="service_id"
        fullWidth
        required
        value={formData.service_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, service_id: e.target.value })
        }
        margin="normal"
        disabled={!formData.equipment_id}
      >
        {serviceList.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.category}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Area (State > District > Tehsil > Village)"
        name="area_id"
        fullWidth
        required
        value={formData.area_id || ""}
        onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
        margin="normal"
      >
        {areaList.map((area) => (
          <MenuItem key={area.id} value={area.id}>
            {`${area.state_name || ""} > ${area.district_name || ""} > ${
              area.tehsil_name || ""
            } > ${area.village_name || ""}`}
          </MenuItem>
        ))}
      </TextField>

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

  const serviceareasFormContentEdit = (
    <>
      <TextField
        select
        label="Equipment"
        name="equipment_id"
        fullWidth
        required
        value={formData.equipment_id || ""}
        onChange={(e) => {
          const id = e.target.value;
          setFormData({ ...formData, equipment_id: e.target.value });
          setSelectedEquipmentId(id);
        }}
        // disabled={!selectedState}
        margin="normal"
      >
        {equipment.map((equipment) => (
          <MenuItem key={equipment.id} value={equipment.id}>
            {equipment.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Service"
        name="service_id"
        fullWidth
        required
        value={formData.service_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, service_id: e.target.value })
        }
        margin="normal"
      >
        {serviceList.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.category}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Area (State > City > Village)"
        name="area_id"
        fullWidth
        required
        value={formData.area_id || ""}
        onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
        margin="normal"
      >
        {areaList.map((area) => (
          <MenuItem key={area.id} value={area.id}>
            {`${area.state_name || ""} > ${area.city_name || ""} > ${
              area.village_name || ""
            }`}
          </MenuItem>
        ))}
      </TextField>

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
      pageTitle="Service Areas"
      add="Add Service Areas"
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
              ? serviceareasFormContent
              : serviceareasFormContentEdit
          }
          add={
            drawerOpen === "add" ? "Add Service Areas" : "Edit Service Areas"
          }
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />
        <BasicTable rows={rowsWithSerial} columns={columns} loading={loading} />

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
      </div>
    </DashboardLayout>
  );
};

export default ServiceAreas;
