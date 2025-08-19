import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";

const Equipment = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [substation, setSubstation] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({});

  const [previewImage, setPreviewImage] = useState(null);

  const handleImagePreview = (url) => {
    setPreviewImage(url);
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

    fetchServices();
  }, []);

  const toggleDrawer = (value) => {
    if (value === "add") {
      setIsEditMode(false); // ✅ ensure it's add mode
      setFormData({}); // ✅ reset form
    }
    setDrawerOpen(value);
  };

  // const handleStatusToggle = async (id, currentStatus) => {
  //   const newStatus = currentStatus ? 0 : 1;

  //   try {
  //     const response = await apiRequest({
  //       url: `/equipments/${id}`, // Use `id` passed to the function
  //       method: "put",
  //       data: {
  //         // is_enabled: newStatus, // Send the toggled status
  //       },
  //     });

  //     if (response.success) {
  //       toast.success("Equipment status updated successfully!");
  //       handleAdminList(); // Refresh the list or rows
  //     } else {
  //       toast.error(response.message || "Failed to update status.");
  //     }
  //   } catch (error) {
  //     const msg = error?.response?.data?.message || "Something went wrong.";
  //     toast.error(msg);
  //   }
  // };

  const handleDelete = async () => {
    if (!deleteId) return; // Ensure deleteId is available

    try {
      const response = await apiRequest({
        url: `/equipments/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Equipment deleted successfully!");
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

    // Append all fields — must be strings/numbers/booleans
    formDataToSend.append("name", formdata.name || "");
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
    formDataToSend.append("inventory", formdata.inventory?.toString() || "0");
    formDataToSend.append(
      "substation_id",
      formdata.substation_id?.toString() || "0"
    );
    // formDataToSend.append("is_enabled", Number(formdata.is_enabled).toString());
    formDataToSend.append("image", formdata.image);

    if (isEditMode) {
      formDataToSend.append("_method", "PUT");
    }

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode ? `/equipments/${formData.id}` : "/equipments",
        method: "post",
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Equipment updated successfully!"
            : "Equipment created successfully!"
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

  //   const [showPassword, setShowPassword] = useState(false);
  //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    { field: "name", headerName: "Name", width: 150 },
    { field: "service_name", headerName: "Service Name", width: 150 },
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
    { field: "inventory", headerName: "Inventory", width: 150 },
    { field: "substation_name", headerName: "Substation", width: 150 },
    // {
    //   field: "is_enabled",
    //   headerName: "Status",
    //   width: 180,
    //   renderCell: (params) => {
    //     const isEnabled = params.row.is_enabled === 1;

    //     return (
    //       <label className="relative inline-flex items-center cursor-pointer w-16">
    //         <input
    //           type="checkbox"
    //           className="sr-only peer"
    //           checked={isEnabled}
    //           onChange={() => handleStatusToggle(params.row.id, isEnabled)}
    //         />
    //         <div className="w-11 h-6 bg-gray-400 peer-checked:bg-green-600 rounded-full peer-focus:ring-2 peer-focus:ring-green-500 transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
    //       </label>
    //     );
    //   },
    // },

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
        url: "/equipments",
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

  const equipmentsByService = {
    Cultivation: [
      "Super Seeder (7 feet)",
      "Rotavator (8/10 feet)",
      "Cultivator",
      "Potato Planter",
      "Pneumatic Planter",
      "Automatic Paddy Planter",
      "Trencher",
      "Automatic Boom Sprayer",
      "Drone Sprayer",
    ],
    Harvesting: [
      "Wheat Combine Harvester",
      "Paddy Combine Harvester",
      "Sugarcane Harvester",
      "Automatic Potato Digger & Grader",
      "Pneumatic Planter",
    ],
    Transportation: [
      "Trolley Bed (5 feet high)",
      "PTO Trolley for Sugarcane",
      "Tata 207 or UTE",
      "Additional Mileage Charge",
    ],
  };

  const selectedService = services.find((s) => s.id === formData.service_id);

  const equipments = selectedService
    ? equipmentsByService[selectedService.name] || []
    : [];

  const equipmentFormContent = (
    <>
      <TextField
        select
        label="Select Service"
        name="service_id"
        value={formData.service_id || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            service_id: Number(e.target.value),
            equipment_id: "",
          })
        }
        fullWidth
        required
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
        label="Select Equipment"
        name="name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        fullWidth
        required
        margin="normal"
        disabled={!formData.service_id}
      >
        {equipments.length > 0 ? (
          equipments.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No equipment found</MenuItem>
        )}
      </TextField>

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

      <TextField
        placeholder="Enter Inventory"
        label="Inventory"
        name="inventory"
        type="number"
        fullWidth
        required
      />

      {/* Image Upload Field */}
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
        {/* Show selected file name */}
        {formData.image && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {formData.image.name}
          </Typography>
        )}

        {/* Show image preview */}
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

      {/* <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        defaultValue="1" // or true / false
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField> */}
    </>
  );

  const equipmentFormContentEdit = (
    <>
      <TextField
        select
        label="Select Service"
        name="service_id"
        value={formData.service_id || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            service_id: Number(e.target.value),
            name: "", // reset equipment when service changes
          })
        }
        fullWidth
        required
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
        label="Select Equipment"
        name="name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        fullWidth
        required
        margin="normal"
        disabled={!formData.service_id}
      >
        {equipments.length > 0 ? (
          equipments.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No equipment found</MenuItem>
        )}
      </TextField>

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
      <TextField
        placeholder="Enter Inventory"
        label="Inventory"
        name="inventory"
        defaultValue={formData.inventory || ""}
        onChange={(e) =>
          setFormData({ ...formData, inventory: e.target.value })
        }
        fullWidth
        required
      />

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

      {/* <TextField
        select
        label="Status"
        name="is_enabled"
        value={Number(formData.is_enabled)}
        onChange={(e) =>
          setFormData({ ...formData, is_enabled: Number(e.target.value) })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField> */}
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Equipments"
      add="Add Equipment"
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
              ? equipmentFormContent
              : equipmentFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Equipment" : "Edit Equipment"}
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />
        <BasicTable rows={rowsWithSerial} columns={columns} loading={loading} />
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
      </div>
    </DashboardLayout>
  );
};

export default Equipment;
