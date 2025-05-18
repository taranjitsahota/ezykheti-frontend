import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { Camera, Pencil, X, Calendar } from "lucide-react";
import { User } from "lucide-react";

const Profile = () => {
  const [editUser, setEditUser] = useState({
    name: "",
    dob: "",
    email: "",
    contact_number: "",
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("user_id");

    try {
      setLoading(true);
      const response = await apiRequest({
        url: `/users/${id}`,
        method: "put",
        data: editUser,
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        handleUserProfile();
        setIsModalOpen(false);
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  const handleProfileClick = () => {
    if (user.profile_photo_url) {
      setModalImage(user.profile_photo_url || "/default-avatar.png");
      setShowModal(true);
      setShowMenu(false);
    } else {
      fileInputRef.current.click();
      closeMenu();
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await apiRequest({
        url: "/upload-profile-pic",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        toast.success("Profile picture updated!");
        handleUserProfile(); // Refresh user data
      } else {
        toast.error(response.error || "Upload failed.");
      }
    } catch (error) {
      toast.error("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("user_id");
      const response = await apiRequest({
        url: `/delete-upload-profile-pic/${id}`,
        method: "delete",
      });

      if (response.success) {
        toast.success("Profile picture removed!");
        handleUserProfile(); // Refresh user data
      } else {
        toast.error(response.message || "Removal failed.");
      }
    } catch (error) {
      toast.error("Failed to remove picture.");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserProfile = async () => {
    const id = localStorage.getItem("user_id");
    if (!id) {
      toast.error("User ID not found in localStorage.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest({
        url: `/users/${id}`,
        method: "get",
      });

      if (response.success) {
        setUser(response.data);
        setEditUser({
          name: response.data.name || "",
          dob: response.data.dob || "",
          email: response.data.email || "",
          contact_number: response.data.contact_number || "",
        });

        localStorage.setItem(
          "profile_photo",
          response.data.profile_photo_url || ""
        );
      } else {
        toast.error(response.message || "Failed to fetch user info.");
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
    handleUserProfile();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Add this
      document.body.style.position = "fixed"; // Optional
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showModal]);

  if (loading || !user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <DashboardLayout
      pageTitle="My Profile"
      showAddButton={false}
      showFilterButton={false}
    >
      <main className="admin-wrapper max-w-5xl mx-auto space-y-8">
        <section className="bg-white rounded-lg p-6 flex items-center space-x-6 shadow-sm">
          <div className="relative flex-shrink-0">
            {/* <img
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
              src={user.profile_photo_url || "/default-avatar.png"}
            /> */}
            {user.profile_photo_url ? (
              <img
                src={user.profile_photo_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="w-24 h-24 rounded-full object-cover" />
            )}

            {/* Camera Icon Dropdown Trigger */}
            <button
              onClick={toggleMenu}
              className="absolute bottom-1 right-1 bg-[var(--warning-color)] rounded-full p-[2px] border border-white shadow"
              title="Profile options"
            >
              <Camera className="text-white w-5 h-5 p-0.5 cursor-pointer" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div
                className="absolute top-24 left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10"
                onMouseLeave={closeMenu}
              >
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleProfileClick}
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    fileInputRef.current.click();
                    closeMenu();
                  }}
                >
                  Change Photo
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handlePhotoRemove();
                    closeMenu();
                  }}
                >
                  Remove Photo
                </button>
              </div>
            )}

            {/* Hidden File Input for Upload */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--primary-color)] leading-tight">
              {user.name}
            </h3>
            <p className="text-sm text-black">{user.role}</p>
            {/* <p className="text-sm text-black">{user.city}, {user.state}</p> */}
          </div>
        </section>

        {/* Personal Info */}
        <section className="bg-white rounded-lg p-6 shadow-sm relative">
          <h3 className="text-xl font-semibold text-[#222222] mb-6">
            Personal Information
          </h3>
          <button
            className="absolute top-6 right-6 bg-[var(--warning-color)] text-white text-sm font-medium rounded-md px-3 py-1.5 hover:bg-[#d18f0a] flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            Edit <Pencil className="w-4 h-4 ml-1" />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-12">
            <Info label="Name" value={user.name} />
            {/* <Info label="Last Name" value={user.lastName} /> */}
            <Info label="Date of Birth" value={user.dob} />
            <Info label="Email Address" value={user.email} />
            <Info label="Phone No." value={user.contact_number} />
            <Info label="User Role" value={user.role} />
          </div>
        </section>

        {/* Address Info */}
        <section className="bg-white rounded-lg p-6 shadow-sm relative">
          <h3 className="text-xl font-semibold text-[#222222] mb-6">Address</h3>
          <button className="absolute top-6 right-6 bg-[#f5a623] text-white text-sm font-medium rounded-md px-3 py-1.5 hover:bg-[#d18f0a]">
            Edit <i className="fas fa-pen ml-1"></i>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-12">
            <Info label="Country" value={user.country} />
            <Info label="City" value={user.city} />
            <Info label="Postal Code" value={user.postalCode} />
          </div>
        </section>
      </main>

      {showModal && (
        <div
          className="fixed inset-0 bg-opacity-20 backdrop-blur-xl z-50 flex items-center justify-center overflow-hidden"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-8 rounded-lg p-4 max-w-xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 px-2 py-1 right-2 text-gray-600 hover:text-black cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <img
              src={modalImage}
              alt="Profile Large"
              className="w-96 h-96 rounded-md object-cover mx-auto"
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-[90%] max-w-md relative font-sans p-8">
            <h2 className="text-xl font-semibold mb-6">
              Edit Personal Information
            </h2>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
 <form onSubmit={handleProfileUpdate} className="space-y-5">
               <div className="flex flex-col">
                 <label htmlFor="name" className="text-sm mb-1">
                  Name
                 </label>
                 <input
                   type="text"
                    value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  required
                   placeholder="Please enter your name"
                   className="border border-orange-400 rounded px-3 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                 />
               </div>
             
   
             <div className="flex flex-col">
               <label htmlFor="email" className="text-sm mb-1">
                 Email Address
               </label>
               <input
                 value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                 type="email"
                 placeholder="Please enter your email address"
                 className="border border-orange-400 rounded px-3 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
               />
             </div>
   
             <div className="flex flex-col">
               <label htmlFor="phone" className="text-sm mb-1">
                 Phone Number
               </label>
               <input
                 type="tel"
                 placeholder="Please enter your phone number"
                  value={editUser.contact_number}
                  onChange={(e) =>
                    setEditUser({ ...editUser, contact_number: e.target.value })
                  }
                  required
                 className="border border-orange-400 rounded px-3 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
               />
             </div>
   
             <div className="flex flex-col">
               <label htmlFor="dob" className="text-sm mb-1">
                 Date of Birth
               </label>
               <div className="relative">
                 <input
                   type="text"
                   placeholder="Please enter your D.O.B"
                     value={editUser.dob}
                  onChange={(e) =>
                    setEditUser({ ...editUser, dob: e.target.value })
                  }
                   className="border border-gray-300 rounded px-3 py-2 pr-10 text-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-400"
                 />
                 <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg pointer-events-none " />
               </div>
             </div>
   
             <div className="flex justify-end">
               <button
                 type="submit"
                 className="bg-orange-400 text-white px-4 py-2 rounded text-sm hover:bg-orange-500"
               >
                 Save Changes
               </button>
             </div>
           </form>
            {/* <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Date of Birth</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={editUser.dob}
                  onChange={(e) =>
                    setEditUser({ ...editUser, dob: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Contact Number</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editUser.contact_number}
                  onChange={(e) =>
                    setEditUser({ ...editUser, contact_number: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--primary-color-dark)]"
                >
                  Save Changes
                </button>
              </div>
            </form> */}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Reusable Info block
const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-black text-lg font-normal">{value || "—"}</p>
  </div>
);

export default Profile;
