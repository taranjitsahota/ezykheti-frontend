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
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import { countryCodes } from "../../data/countryCodes";
import Equipment from "./Equipment";

const EquipmentType = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [services, setServices] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleImagePreview = (url) => {
    setPreviewImage(url);
  };

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
        url: `/equipment-types/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Equipment Type deleted successfully!");
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
    if (!formData.image) {
      toast.error("Equipment image is required.");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("equipment_id", formdata.equipment_id || "");
    formDataToSend.append(
      "price_per_kanal",
      formdata.price_per_kanal?.toString() || "0"
    );
    formDataToSend.append("service_id", formdata.service_id?.toString() || "0");
    formDataToSend.append("min_kanal", formdata.min_kanal?.toString() || "0");
    formDataToSend.append(
      "minutes_per_kanal",
      formdata.minutes_per_kanal?.toString() || "0"
    );
    formDataToSend.append("image", formdata.image);
    formDataToSend.append(
      "is_self_propelled",
      Number(formdata.is_self_propelled).toString()
    );
    formDataToSend.append(
      "requires_tractor",
      Number(formdata.requires_tractor).toString()
    );

    if (isEditMode) {
      formDataToSend.append("_method", "PUT");
    }

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/equipment-types/${formData.id}` // replace with your actual edit API URL
          : "/equipment-types",
        method: "post",
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Equipment Type updated successfully!"
            : "Equipment Type created successfully!"
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
    const fetchservices = async () => {
      try {
        const response = await apiRequest({
          url: `/services`,
          method: "get",
        });

        if (response.success) {
          setServices(response.data);
        } else {
          toast.error(response.message || "Failed to fetch services.");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch services.";
        toast.error(msg);
      }
    };

    fetchservices();
  }, []);

  const fetchEquipmentByService = async (serviceId) => {
    if (!serviceId) {
      setEquipment([]);
      return;
    }
    try {
      const response = await apiRequest({
        url: `/equipment-by-service-id/${serviceId}`,
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
    if (formData.service_id) {
      fetchEquipmentByService(formData.service_id);
    }
  }, [formData.service_id]);

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
    { field: "equipment_name", headerName: "Equipment Name", width: 150 },
    { field: "service_name", headerName: "Service Name", width: 150 },
    { field: "requires_tractor", headerName: "Requires Tractor", width: 150 },
    { field: "is_self_propelled", headerName: "Is Self Propelled", width: 200 },
    {
      field: "minutes_per_kanal",
      headerName: "Default Minutes Per Kanal",
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <div className="flex items-center justify-center w-full">
          <img
            src={params.row.image || "/default.jpg"}
            alt="preview"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => handleImagePreview(params.row.image)}
          />
        </div>
      ),
    },

    { field: "price_per_kanal", headerName: "Price Per Kanal", width: 150 },
    { field: "min_kanal", headerName: "Min Kanal", width: 150 },
    { field: "minutes_per_kanal", headerName: "Minutes Per Kanal", width: 150 },
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
              setFormData(row);
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
        url: "/equipment-types",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch equipment types.");
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

  const equipmentTypeFormContent = (
    <>
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
          // Pass correct substation_id (either from state or fallback)
          if (serviceId) {
            fetchEquipmentByService(serviceId);
          } else {
            // if superadmin hasn't chosen service yet, clear equipments
            setEquipment([]);
          }
        }}
        margin="normal"
      >
        {services.map((service) => (
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
              {equip.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No equipment found for the selected service</MenuItem>
        )}
      </TextField>

      <TextField
        select
        label="Requires Tractor"
        name="requires_tractor"
        value={formData.requires_tractor}
        onChange={(e) =>
          setFormData({ ...formData, requires_tractor: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      <TextField
        select
        label="Self Propelled"
        name="is_self_propelled"
        value={formData.is_self_propelled}
        onChange={(e) =>
          setFormData({ ...formData, is_self_propelled: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      <TextField
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        type="text"
        placeholder="Enter default minutes per kanal"
        value={formData.minutes_per_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, minutes_per_kanal: e.target.value })
        }
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Price Per Kanal"
        placeholder="Enter price per kanal"
        name="price_per_kanal"
        type="number"
        fullWidth
        // margin="normal"
        required
      />
      <TextField
        placeholder="Enter Min Kanal"
        label="Min Kanal"
        name="min_kanal"
        type="number"
        fullWidth
        // margin="normal"
        required
        inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
      />
      <TextField
        placeholder="Enter Minutes Per Kanal"
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        type="number"
        fullWidth
        required
        variant="standard"
      />

      <Typography variant="subtitle1" gutterBottom>
        Upload Equipment Image*
      </Typography>
      <Box mt={4} mb={4}>
        <input
          accept="image/*"
          type="file"
          name="image"
          // required
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file),
              });
            }
          }}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        </label>

        {formData.image && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {formData.image.name}
          </Typography>
        )}

        {formData.imagePreview && (
          <Box mt={2}>
            <img
              src={formData.imagePreview}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </Box>
        )}
      </Box>

      {/* <TextField
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
      </TextField> */}
    </>
  );

  const equipmentTypeFormContentEdit = (
    <>
      {/* Service Selection */}
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
          if (serviceId) {
            fetchEquipmentByService(serviceId);
          } else {
            setEquipment([]);
          }
        }}
        margin="normal"
      >
        {services.length > 0 ? (
          services.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No services found</MenuItem>
        )}
      </TextField>

      {/* Equipment Selection */}
      <TextField
        select
        label="Equipment"
        name="equipment_id"
        fullWidth
        required
        value={formData.equipment_type_id || ""}
        onChange={(e) =>
          setFormData({ ...formData, equipment_type_id: e.target.value })
        }
        // disabled={!formData.service_id}
        margin="normal"
      >
        {equipment.length > 0 ? (
          equipment.map((eq) => (
            <MenuItem key={eq.id} value={eq.id}>
              {eq.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No equipment found</MenuItem>
        )}
      </TextField>

      {/* Requires Tractor */}
      <TextField
        select
        label="Requires Tractor"
        name="requires_tractor"
        value={formData.requires_tractor}
        onChange={(e) =>
          setFormData({ ...formData, requires_tractor: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      {/* Self Propelled */}
      <TextField
        select
        label="Self Propelled"
        name="is_self_propelled"
        value={formData.is_self_propelled}
        onChange={(e) =>
          setFormData({
            ...formData,
            is_self_propelled: e.target.value,
          })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      <TextField
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        type="text"
        placeholder="Enter default minutes per kanal"
        value={formData.minutes_per_kanal || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            minutes_per_kanal: e.target.value,
          })
        }
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Price Per Kanal"
        placeholder="Enter price per kanal"
        name="price_per_kanal"
        defaultValue={formData.price_per_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, price_per_kanal: e.target.value })
        }
        fullWidth
        required
      />

      <TextField
        placeholder="Enter Min Kanal"
        label="Min Kanal"
        name="min_kanal"
        defaultValue={formData.min_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, min_kanal: e.target.value })
        }
        fullWidth
        required
      />

      <TextField
        placeholder="Enter Minutes Per Kanal"
        label="Minutes Per Kanal"
        name="minutes_per_kanal"
        defaultValue={formData.minutes_per_kanal || ""}
        onChange={(e) =>
          setFormData({ ...formData, minutes_per_kanal: e.target.value })
        }
        fullWidth
        required
      />

      <Box mt={4} mb={4}>
        <input
          accept="image/*"
          type="file"
          name="image"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData({ ...formData, image: file });
            }
          }}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" color="green" component="span">
            Upload Image
          </Button>
          {formData.image && (
            <>
              <span style={{ marginLeft: 10 }}>
                {formData.image instanceof File
                  ? formData.image.name
                  : "Uploaded Image"}
              </span>
              <img
                src={
                  formData.image instanceof File
                    ? URL.createObjectURL(formData.image)
                    : formData.image
                }
                alt="Preview"
                style={{
                  height: 40,
                  marginLeft: 40,
                  marginBottom: 20,
                  marginTop: 20,
                  verticalAlign: "middle",
                }}
              />
            </>
          )}
        </label>
      </Box>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Equipment Type"
      add="Add Equipment Type"
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
              ? equipmentTypeFormContent
              : equipmentTypeFormContentEdit
          }
          add={
            drawerOpen === "add" ? "Add Equipment Type" : "Edit Equipment Type"
          }
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />

        <Dialog
          open={!!previewImage}
          onClose={() => setPreviewImage(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Image Preview</DialogTitle>
          <DialogContent className="flex justify-center">
            <img
              src={previewImage}
              alt="preview"
              className="max-w-full max-h-[400px] rounded"
            />
          </DialogContent>
        </Dialog>

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

export default EquipmentType;
