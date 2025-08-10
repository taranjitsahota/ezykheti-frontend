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

const Areas = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [villages, setVillages] = useState([]);

  const [substation, setSubstation] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTehsil, setSelectedTehsil] = useState("");

  const [selectedVillage, setSelectedVillage] = useState("");

  const handleDrawerClose = () => {
    setDrawerOpen("");
    setIsEditMode(false);
    setFormData(null);
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await apiRequest({
          url: `/location/states`,
          method: "get",
        });

        if (response.success) {
          setStates(response.data); // or response.data.data depending on your API structure
        } else {
          toast.error(response.message || "Failed to fetch states.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await apiRequest({
          url: `/location/districts/${selectedState}`,
          method: "get",
        });
        if (response.success) {
          setDistricts(response.data);
        } else {
          toast.error(response.message || "Failed to fetch districts.");
        }
      } catch (error) {
        toast.error("Failed to fetch districts.");
      }
    };

    if (selectedState) {
      fetchDistricts();
      setSelectedDistrict("");
      setTehsils([]);
      setVillages([]);
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchTehsils = async () => {
      try {
        const response = await apiRequest({
          url: `/location/tehsils/${selectedDistrict}`,
          method: "get",
        });
        if (response.success) {
          setTehsils(response.data);
        } else {
          toast.error(response.message || "Failed to fetch tehsils.");
        }
      } catch (error) {
        toast.error("Failed to fetch tehsils.");
      }
    };

    if (selectedDistrict) {
      fetchTehsils();
      setSelectedTehsil("");
      setVillages([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await apiRequest({
          url: `/location/villages/${selectedTehsil}`,
          method: "get",
        });
        if (response.success) {
          setVillages(response.data);
        } else {
          toast.error(response.message || "Failed to fetch villages.");
        }
      } catch (error) {
        toast.error("Failed to fetch villages.");
      }
    };

    if (selectedTehsil) {
      fetchVillages();
      setSelectedVillage("");
    }
  }, [selectedTehsil]);

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

  const handleEditArea = async (row) => {
    setIsEditMode(true);
    setFormData(row);
    setDrawerOpen(true); // Open drawer first

    setSelectedDistrict(row.district_id);

    // Fetch tehsils based on district_id
    const tehsilRes = await apiRequest({
      url: `/location/tehsils/${row.district_id}`,
      method: "get",
    });
    if (tehsilRes.success) setTehsils(tehsilRes.data);

    setSelectedTehsil(row.tehsil_id);

    // Fetch villages based on tehsil_id
    const villageRes = await apiRequest({
      url: `/location/villages/${row.tehsil_id}`,
      method: "get",
    });
    if (villageRes.success) setVillages(villageRes.data);

    setSelectedVillage(row.village_id);
  };

  const [submitLoading, setSubmitLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      setSelectedDistrict("");
      setSelectedTehsil("");
      setSelectedVillage("");
    }
    setDrawerOpen(value);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;

    try {
      const response = await apiRequest({
        url: `/areas/${id}`, // Use `id` passed to the function
        method: "put",
        data: {
          is_enabled: newStatus, // Send the toggled status
        },
      });

      if (response.success) {
        toast.success("Area status updated successfully!");
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
        url: `/areas/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Area deleted successfully!");
        handleAdminList(); // Refresh list of admins or any data
      } else {
        toast.error(response.message || "Failed to delete.");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };
  console.log(isEditMode);
  const handleSubmit = async (formdata) => {
    const data = {
      state_id: selectedState,
      district_id: selectedDistrict,
      tehsil_id: selectedTehsil,
      village_id: selectedVillage,
      substation_id: formdata?.substation_id,
      is_enabled: formdata?.is_enabled,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/areas/${formData.id}` // replace with your actual edit API URL
          : "/areas",
        method: isEditMode ? "put" : "post",
        data: data,
      });
      if (response.success) {
        toast.success(
          isEditMode
            ? "Area updated successfully!"
            : "Area created successfully!"
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
    { field: "state_name", headerName: "State", width: 150 },
    { field: "district_name", headerName: "District", width: 150 },
    { field: "tehsil_name", headerName: "Tehsil", width: 150 },
    { field: "village_name", headerName: "village", width: 150 },
    { field: "substation_name", headerName: "Substation", width: 150 },

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
            onClick={() => handleEditArea(params.row)}
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
        url: "/areas",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch areas.");
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

  const areaFormContent = (
    <>
      <TextField
        select
        label="State"
        fullWidth
        required
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        margin="normal"
      >
        {states.map((state) => (
          <MenuItem key={state.id} value={state.id}>
            {state.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="District"
        fullWidth
        required
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        margin="normal"
      >
        {districts.map((district) => (
          <MenuItem key={district.id} value={district.id}>
            {district.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Tehsil"
        fullWidth
        required
        value={selectedTehsil}
        onChange={(e) => setSelectedTehsil(e.target.value)}
        disabled={!selectedDistrict}
        margin="normal"
      >
        {tehsils.map((tehsil) => (
          <MenuItem key={tehsil.id} value={tehsil.id}>
            {tehsil.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Village"
        fullWidth
        required
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
        disabled={!selectedTehsil}
        margin="normal"
      >
        {villages.map((village) => (
          <MenuItem key={village.id} value={village.id}>
            {village.name}
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

      {/* Optional: Status Dropdown */}
      <TextField
        select
        label="Status"
        name="is_enabled"
        fullWidth
        required
        defaultValue=""
        margin="normal"
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  const areaFormContentEdit = (
    <>
      <TextField
        select
        label="State"
        fullWidth
        required
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        margin="normal"
      >
        {states.map((state) => (
          <MenuItem key={state.id} value={state.id}>
            {state.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="District"
        fullWidth
        required
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        margin="normal"
      >
        {districts.map((district) => (
          <MenuItem key={district.id} value={district.id}>
            {district.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Tehsil"
        fullWidth
        required
        value={selectedTehsil}
        onChange={(e) => setSelectedTehsil(e.target.value)}
        disabled={!selectedDistrict}
        margin="normal"
      >
        {tehsils.map((tehsil) => (
          <MenuItem key={tehsil.id} value={tehsil.id}>
            {tehsil.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Village"
        fullWidth
        required
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
        disabled={!selectedTehsil}
        margin="normal"
      >
        {villages.map((village) => (
          <MenuItem key={village.id} value={village.id}>
            {village.name}
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
        defaultValue={formData?.is_enabled}
        margin="normal"
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Areas"
      add="Add Area"
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
            drawerOpen === "add" ? areaFormContent : areaFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Area" : "Edit Area"}
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={isEditMode ? formData : null}
          isEdit={isEditMode}
          onClose={handleDrawerClose}
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

export default Areas;
