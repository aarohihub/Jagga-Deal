import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/user/userSlice";
import { axiosInstance } from "../../libs/axios";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // Initialize formData with currentUser's data only on the first render
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    aboutUser: currentUser?.aboutUser || "",
    email: currentUser?.email || "",
    contactNumber: currentUser?.contactNumber || "",
    address: currentUser?.address || "",
    avatar: currentUser?.avatar || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const BaseImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // Sync formData with Redux state whenever currentUser updates
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        aboutUser: currentUser.aboutUser || "",
        email: currentUser.email || "",
        contactNumber: currentUser.contactNumber || "",
        address: currentUser.address || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent submitting if already loading

    try {
      setIsLoading(true);
      dispatch(updateUserStart());

      const result = await axiosInstance.put(
        `/me/update/${currentUser._id}`,
        formData
      );
      if (!result) {
        throw new Error("Update failed");
      }
      console.log(result);

      dispatch(updateUserSuccess(result.data.result));

      setSuccessMessage("User updated successfully!");
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 h-full w-full">
      <div className="rounded-xl w-full h-[600px] p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture Section */}
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="Profile"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105 select-none"
            />
            <div className="text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error uploading image (must be less than 2 MB)
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-green-600">{`Uploading ${filePercentage}%`}</span>
              ) : filePercentage === 100 ? (
                <span className="text-green-600">
                  Image successfully uploaded
                </span>
              ) : null}
            </div>

            {/* Name and Edit Button */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  formData.fullName
                )}
              </h1>

              <button onClick={() => setIsEditing(true)} className="btn glass">
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Details Section */}
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                name="aboutUser"
                placeholder="Tell us about yourself"
                value={formData.aboutUser}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="mb-6">{formData.aboutUser}</p>
            )}

            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <ul className="space-y-2">
              <li>📧 {formData.email}</li>
              <li>
                {isEditing ? (
                  <input
                    type="number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  formData.contactNumber
                )}
              </li>
              <li>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  formData.address
                )}
              </li>
            </ul>

            {/* Save and Cancel Buttons */}
            {isEditing && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}

            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
