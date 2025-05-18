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
  const [cities, setCities] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState(28);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const handleDrawerClose = () => {
    setDrawerOpen("");
    setIsEditMode(false); // ✅ Reset the mode
    setFormData(null); // ✅ Optional: Clear form data
  };

  //  useEffect(() => {
  // const fetchStates = async () => {
  //   try {
  //     const response = await apiRequest({
  //       url: `/location/states`,
  //       method: "get",
  //     });

  //     if (response.success) {
  //       setStates(response.data); // or response.data.data depending on your API structure
  //     } else {
  //       toast.error(response.message || "Failed to fetch states.");
  //     }
  //   } catch (error) {
  //     const msg = error?.response?.data?.message || "Something went wrong.";
  //     toast.error(msg);
  //   }
  // };

  useEffect(() => {
    setSelectedState(28); // Punjab ID
  }, []);

  // }, []);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await apiRequest({
          url: `/location/cities/${selectedState}`,
          method: "get",
        });

        if (response.success) {
          setCities(response.data); // or response.data.data depending on your API structure
        } else {
          toast.error(response.message || "Failed to fetch cities.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      }
    };

    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await apiRequest({
          url: `/location/get-villages/${selectedCity}`,
          method: "get",
        });

        if (response.success) {
          setVillages(response.data); // or response.data.data depending on your API shape
        } else {
          toast.error(response.message || "Failed to fetch villages.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      }
    };

    if (selectedCity) {
      fetchVillages();
    } else {
      setVillages([]);
      setSelectedVillage("");
    }
  }, [selectedCity]);

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
      setSelectedCity("");
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
      city_id: selectedCity,
      state_id: selectedState,
      village_id: selectedVillage,
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
    { field: "city_name", headerName: "City", width: 150 },
    { field: "state_name", headerName: "State", width: 150 },
    { field: "village_name", headerName: "village", width: 150 },

    {
      field: "is_enabled",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        const isEnabled = params.row.is_enabled === 1;

        return (
          <div
            className={`flex items-center rounded-full w-28 h-10 cursor-pointer transition-all duration-300 ${
              isEnabled
                ? "bg-green-700 justify-start"
                : "bg-red-700 justify-end"
            }`}
            onClick={() => handleStatusToggle(params.row.id, isEnabled)}
          >
            {isEnabled ? (
              <>
                <div
                  className="w-10 h-10 bg-gradient-to-tr from-gray-300 to-gray-100 rounded-full shadow-inner ml-0"
                  style={{
                    boxShadow:
                      "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
                  }}
                ></div>
                <span className="text-white text-base font-normal ml-4">
                  Enable
                </span>
              </>
            ) : (
              <>
                <span className="text-white text-base font-normal mr-4">
                  Disable
                </span>
                <div
                  className="w-10 h-10 bg-gradient-to-tr from-gray-300 to-gray-100 rounded-full shadow-inner mr-0"
                  style={{
                    boxShadow:
                      "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
                  }}
                ></div>
              </>
            )}
          </div>
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
              setSelectedCity(params.row.city_id);
              setSelectedVillage(params.row.village_id);
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
        disabled
        margin="normal"
      >
        <MenuItem value={28}>Punjab</MenuItem>
      </TextField>

      <TextField
        select
        label="City"
        fullWidth
        required
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        margin="normal"
      >
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
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
        disabled={!selectedCity}
        margin="normal"
      >
        {villages.map((village) => (
          <MenuItem key={village.id} value={village.id}>
            {village.name}
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
        disabled
        margin="normal"
      >
        <MenuItem value={28}>Punjab</MenuItem>
      </TextField>

      <TextField
        select
        label="City"
        fullWidth
        required
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        margin="normal"
      >
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
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
        disabled={!selectedCity}
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
