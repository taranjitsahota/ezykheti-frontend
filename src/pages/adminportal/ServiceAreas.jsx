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

  const role = localStorage.getItem("user_role");
  const isSuperAdmin = role === "superadmin";
  const loggedSubstationId = localStorage.getItem("substation_id");

  const fetchEquipmentByService = async (serviceId, substationId) => {
    if (!serviceId || !substationId) {
      setEquipment([]);
      return;
    }
    try {
      const response = await apiRequest({
        url: `/equipment-by-service-id/${serviceId}/${substationId}`,
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

  const fetchAreas = async (substationId) => {
    if (!substationId) {
      setAreaList([]);
      return;
    }
    try {
      const response = await apiRequest({
        url: `/area-by-substation-id/${substationId}`,
        method: "get",
      });

      if (response.success) {
        setAreaList(Array.isArray(response.data) ? response.data : []);
      } else {
        toast.error(response.message || "Failed to fetch areas.");
        setAreaList([]);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
      setAreaList([]);
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
    const fetchServices = async () => {
      try {
        const response = await apiRequest({
          url: `/services`,
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
      setIsEditMode(false);

      if (!isSuperAdmin && loggedSubstationId) {
        // Admin: prefill substation and fetch areas
        setFormData({ substation_id: loggedSubstationId });
        setEquipment([]);
        fetchAreas(loggedSubstationId);
      } else {
        // Superadmin or no logged substation
        setFormData({});
        setAreaList([]);
        setEquipment([]);
      }

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

  const handleEditServiceArea = async (row) => {
    // determine substation to use (superadmin: row.substation_id, admin: loggedSubstationId)
    const substationId = isSuperAdmin ? row.substation_id : loggedSubstationId;

    // fetch areas for that substation (populates area dropdown)
    if (substationId) {
      await fetchAreas(substationId);
    } else {
      setAreaList([]);
    }

    // fetch equipment for the row's service + substation
    if (row.service_id && substationId) {
      await fetchEquipmentByService(row.service_id, substationId);
    } else {
      setEquipment([]);
    }

    // now set the form (so dropdowns have values)
    setFormData({
      ...row,
      substation_id: substationId,
      equipment_id: row.equipment_id || "",
    });
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
              // setFormData(params.row); // row = your current row data
              handleEditServiceArea(params.row);
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

  useEffect(() => {
    if (!formData?.service_id) {
      setEquipment([]);
      return;
    }

    const substationId = isSuperAdmin
      ? formData.substation_id
      : loggedSubstationId;
    if (!substationId) {
      setEquipment([]);
      return;
    }

    fetchEquipmentByService(formData.service_id, substationId);
  }, [
    formData?.service_id,
    formData?.substation_id,
    loggedSubstationId,
    isSuperAdmin,
  ]);

  const serviceareasFormContent = (
    <>
      {isSuperAdmin && (
        <TextField
          select
          label="Substation"
          name="substation_id"
          value={formData.substation_id || ""}
          onChange={(e) => {
            const subId = e.target.value;
            setFormData((prev) => ({
              ...prev,
              substation_id: subId,
              service_id: "",
              equipment_id: "",
              area_id: "",
            }));
            setEquipment([]);
            setAreaList([]);
            if (subId) fetchAreas(subId);
          }}
          fullWidth
          required
        >
          {substation.map((sub) => (
            <MenuItem key={sub.id} value={sub.id}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        select
        label="Service"
        name="service_id"
        fullWidth
        required
        value={formData.service_id || ""}
        onChange={(e) => {
          const serviceId = e.target.value;
          setFormData((prev) => ({
            ...prev,
            service_id: serviceId,
            equipment_id: "", // reset equipment
          }));
          // const substationId = formData.substation_id || null;
          const substationId = isSuperAdmin
            ? formData.substation_id
            : loggedSubstationId;
          // Pass correct substation_id (either from state or fallback)
          if (substationId) {
            fetchEquipmentByService(serviceId, substationId);
          } else {
            // if superadmin hasn't chosen substation yet, clear equipments
            setEquipment([]);
          }
        }}
        margin="normal"
      >
        {serviceList.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Equipment"
        name="equipment_id"
        fullWidth
        required
        value={formData.equipment_id || ""}
        onChange={(e) => {
          setFormData({ ...formData, equipment_id: e.target.value });
        }}
        disabled={!formData.service_id}
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((equip) => (
            <MenuItem key={equip.id} value={equip.id}>
              {equip.name}{" "}
              {/* {equip.substation_name
                ? `(${equip.substation_name})`
                : "(no data)"} */}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No equipment found for the selected service</MenuItem>
        )}
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
      {isSuperAdmin && (
        <TextField
          select
          label="Substation"
          name="substation_id"
          value={formData.substation_id || ""}
          onChange={(e) => {
            setFormData({
              ...formData,
              substation_id: e.target.value,
              service_id: "",
              equipment_id: "",
            });
            setEquipment([]);
          }}
          fullWidth
          required
        >
          {substation.map((sub) => (
            <MenuItem key={sub.id} value={sub.id}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>
      )}
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
            {service.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Equipment"
        name="equipment_id"
        fullWidth
        required
        value={formData.equipment_id || ""}
        onChange={(e) => {
          setFormData({ ...formData, equipment_id: e.target.value });
        }}
        disabled={!formData.service_id}
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((eq) => (
            <MenuItem key={eq.id} value={eq.id}>
              {eq.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Loading equipments...</MenuItem>
        )}
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
