import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import BasicTable from "../../components/adminportal/BasicTable";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Anchor from "../../components/adminportal/Anchor";
import ConfirmModal from "../../components/adminportal/ConfirmModal";
import { countryCodes } from "../../data/countryCodes";

const Partners = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  // const [substation, setSubstation] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    company_name: "",
    address: "",
    is_driver: 0,
    is_individual: 0,
    country_code: "",
    license_number: "",
    experience_years: "",
  });

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
        url: `/partners/${deleteId}`, // Dynamic URL using deleteId
        method: "delete",
      });

      if (response.success) {
        toast.success("Partner deleted successfully!");
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
    if (!formdata.country_code) {
      toast.error("Please select a country code.");
      return;
    }

    if (!formdata.phone) {
      toast.error("Please enter a phone number.");
      return;
    }
    const buildCleanPhone = (code, number) =>
      (code + number).replace(/\s+/g, "").replace(/^\+/, "");

    const data = {
      name: formdata?.name,
      email: formdata?.email,
      phone: buildCleanPhone(formdata.country_code, formdata.phone),
      password: formdata?.password,
      password_confirmation: formdata?.confirm_password,
      company_name: formdata?.company_name,
      is_driver: formdata?.is_driver,
      is_individual: formdata?.is_individual,
      address: formdata?.address,
      license_number: formdata?.license_number,
      experience_years: formdata?.experience_years,
      // substation_id: formdata?.substation_id,
    };

    try {
      setSubmitLoading(true);

      const response = await apiRequest({
        url: isEditMode
          ? `/partners/${formData.id}` // replace with your actual edit API URL
          : "/partners",
        method: isEditMode ? "put" : "post",
        data: isEditMode
          ? {
              name: formData.name,
              email: formData.email,
              phone: buildCleanPhone(formData.country_code, formData.phone),
              company_name: formData.company_name,
              is_driver: formData.is_driver,
              is_individual: formData.is_individual,
              address: formData.address,
              license_number: formData.license_number,
              experience_years: formData.experience_years,
              // substation_id: formData.substation_id,
            }
          : data,
      });

      if (response.success) {
        toast.success(
          isEditMode
            ? "Partner updated successfully!"
            : "Partner created successfully!"
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

  // useEffect(() => {
  //   const fetchSubstation = async () => {
  //     try {
  //       const response = await apiRequest({
  //         url: `/substations`,
  //         method: "get",
  //       });

  //       if (response.success) {
  //         setSubstation(response.data);
  //       } else {
  //         toast.error(response.message || "Failed to fetch substations.");
  //       }
  //     } catch (error) {
  //       const msg =
  //         error?.response?.data?.message || "Failed to fetch substations.";
  //       toast.error(msg);
  //     }
  //   };

  //   fetchSubstation();
  // }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Contact", width: 150 },
    { field: "company_name", headerName: "Company Name", width: 150, renderCell: (params) => params.value || "-" },
    { field: "address", headerName: "Address", width: 150, renderCell: (params) => params.value || "-" },
    { field: "is_driver", headerName: "Is Driver", width: 150 },
    { field: "is_individual", headerName: "Is Individual", width: 150 },
    // { field: "substation", headerName: "Substation", width: 150 },

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
        url: "/partners",
        method: "get",
      });

      if (response.success) {
        setRows(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch partners.");
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

  const partnerFormContent = (
    <>
      <TextField
        label="Name"
        placeholder="Enter name"
        name="name"
        fullWidth
        required
      />
      <TextField
        label="Email"
        placeholder="Enter email"
        name="email"
        type="email"
        fullWidth
        // margin="normal"
        required
      />
      <Box className="flex gap-2 w-full">
        <TextField
          select
          label="Code"
          name="country_code"
          value={formData.country_code || ""}
          onChange={(e) =>
            setFormData({ ...formData, country_code: e.target.value })
          }
          sx={{ minWidth: "90px" }}
          // required
        >
          {countryCodes.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          placeholder="Enter contact number"
          label="Contact Number"
          name="phone"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          fullWidth
          required
          inputProps={{ maxLength: 15, pattern: "[0-9]*" }}
        />
      </Box>
      <TextField
        placeholder="Enter Password"
        label="Password"
        name="password"
        fullWidth
        required
        type={showPassword ? "text" : "password"}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          className: "admin-textfield",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                className="ml-2 cursor-pointer right-2"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-600" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          className: "admin-label",
          shrink: true,
        }}
      />

      <TextField
        placeholder="Confirm Password"
        label="Confirm Password"
        name="confirm_password"
        fullWidth
        required
        type={showConfirmPassword ? "text" : "password"}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          className: "admin-textfield",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                className="ml-2 cursor-pointer right-2"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-600" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          className: "admin-label",
          shrink: true,
        }}
      />

      <TextField
        type="text"
        label="Company Name"
        placeholder="Enter Company Name"
        name="company_name"
        fullWidth
        // required
      />

      <TextField
        type="text"
        label="Company Address"
        placeholder="Enter Company Address"
        name="address"
        fullWidth
        // required
      />

      <TextField
        select
        label="is_driver"
        name="is_driver"
        value={formData.is_driver}
        onChange={(e) =>
          setFormData({ ...formData, is_driver: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      <TextField
        select
        label="is_individual"
        name="is_individual"
        value={formData.is_individual}
        onChange={(e) =>
          setFormData({ ...formData, is_individual: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      {Number(formData.is_driver) === 1 && (
        <>
          <TextField
            type="text"
            label="License Number"
            name="license_number"
            value={formData.license_number}
            onChange={(e) =>
              setFormData({ ...formData, license_number: e.target.value })
            }
            fullWidth
            required
          />

          <TextField
            type="number"
            label="Experience (years)"
            name="experience_years"
            value={formData.experience_years}
            onChange={(e) =>
              setFormData({ ...formData, experience_years: e.target.value })
            }
            fullWidth
            required
          />
        </>
      )}

      {/* <TextField
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
      </TextField> */}
    </>
  );

  const partnerFormContentEdit = (
    <>
      <TextField
        label="Name"
        placeholder="Enter name"
        name="name"
        defaultValue={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
      />

      <TextField
        label="Email"
        placeholder="Enter email"
        name="email"
        type="email"
        defaultValue={formData.email || ""}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        fullWidth
        required
      />

      <Box className="flex gap-2 w-full">
        <TextField
          select
          label="Code"
          name="country_code"
          value={formData.country_code || ""}
          onChange={(e) =>
            setFormData({ ...formData, country_code: e.target.value })
          }
          sx={{ minWidth: "90px" }}
          required
        >
          {countryCodes.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          placeholder="Enter contact number"
          label="Contact Number"
          name="phone"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          fullWidth
          required
          inputProps={{ maxLength: 15, pattern: "[0-9]*" }}
        />
      </Box>

      <TextField
        type="text"
        label="Company Name"
        placeholder="Enter Company Name"
        name="company_name"
        defaultValue={formData.company_name || ""}
        onChange={(e) =>
          setFormData({ ...formData, company_name: e.target.value })
        }
        fullWidth
      />

      <TextField
        type="text"
        label="Company Address"
        placeholder="Enter Company Address"
        name="address"
        defaultValue={formData.address || ""}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        fullWidth
        // required
      />

      <TextField
        select
        label="is_driver"
        name="is_driver"
        value={formData.is_driver}
        onChange={(e) =>
          setFormData({ ...formData, is_driver: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      <TextField
        select
        label="is_individual"
        name="is_individual"
        value={formData.is_individual}
        onChange={(e) =>
          setFormData({ ...formData, is_individual: e.target.value })
        }
        fullWidth
        required
      >
        <MenuItem value={1}>True</MenuItem>
        <MenuItem value={0}>False</MenuItem>
      </TextField>

      {/* {Number(formData.is_driver) === 1 && (
        <>
          <TextField
            type="text"
            label="License Number"
            name="license_number"
            value={formData.license_number || ""}
            onChange={(e) =>
              setFormData({ ...formData, license_number: e.target.value })
            }
            fullWidth
            required
          />

          <TextField
            type="number"
            label="Experience (years)"
            name="experience_years"
            value={formData.experience_years || ""}
            onChange={(e) =>
              setFormData({ ...formData, experience_years: e.target.value })
            }
            fullWidth
            required
          />
        </>
      )} */}

      {/* <TextField
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
    </TextField> */}
    </>
  );

  return (
    <DashboardLayout
      pageTitle="Partners"
      add="Add Partner"
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
            drawerOpen === "add" ? partnerFormContent : partnerFormContentEdit
          }
          add={drawerOpen === "add" ? "Add Partner" : "Edit Partner"}
          handleSubmit={handleSubmit}
          loading={submitLoading}
          formData={drawerOpen !== "add" && formData}
          isEdit={drawerOpen !== "add" && isEditMode}
        />

        <div>
          <ConfirmModal
            show={showConfirm}
            onClose={() => setShowConfirm(false)}
            message = "🚨 WARNING: Deleting this partner will erase ALL their associated data forever. This action is irreversible. Are you absolutely sure?"
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

export default Partners;
