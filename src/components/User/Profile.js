import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AlertContext } from "../../context/AlertContext";
import { updateUser } from "../../utils/api";
import ButtonSubmit from "../Tools/ButtonSubmit";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserContext } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  // const API_BASE_URL ="http://localhost:3000/";

  useEffect(() => {
    // Set default values
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      const response = await updateUser(formData);
      const updatedUserData = response.data?.data.user;
      updateUserContext(updatedUserData);

      setIsLoading(false);
      showAlert("Profile updated successfully", 5000, "success");
    } catch (err) {
      setIsLoading(false);
      showAlert(
        err.response ? err.response.data.message : err.message,
        5000,
        "error"
      );
    }
  };
  const selectedPhoto = watch("photo");

  return (
    <div className="min-h-[calc(100vh-65px)] flex justify-center sm:pt-10 grow bg-gray-100 dark:bg-gray-800">
      <div className="flex w-full max-w-5xl rounded overflow-hidden animate-fade-in-up animation-fill m-4">
        <aside className="hidden sm:block w-52 py-6 bg-gradient-to-br from-orange-400 to-red-500 text-white">
          <ul>
            <li className="p-3 border-l-4 border-white font-medium">
              Settings
            </li>
            <li className="p-3 whitespace-nowrap hover:font-medium">
              <Link className="flex w-full h-full" to="/favorites">
                My Favorites
              </Link>
            </li>
          </ul>
        </aside>
        <main className="p-10 sm:p-16 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 grow">
          <h1 className="text-2xl font-bold mb-10">Your Account Settings</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-2">
            <div className="leading-normal text-sm">
              <label className="font-medium  ">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2 text-gray-900 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-500"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="leading-normal text-sm">
              <label className="font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-2 text-gray-900 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex items-center ">
              <div>
                {selectedPhoto && selectedPhoto.length > 0 ? (
                  <img
                    src={URL.createObjectURL(selectedPhoto[0])}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : (
                  user?.photo && (
                    <img
                      src={`/img/users/${user.photo}`}
                      alt="User"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )
                )}
              </div>
              <div className="m-3">
                <input
                  type="file"
                  {...register("photo")}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="text-white bg-orange-400 px-2 py-1 text-sm rounded cursor-pointer hover:bg-orange-500"
                >
                  Change Image
                </label>
              </div>
            </div>
            <div className="text-right">
              <div>
                <ButtonSubmit isLoading={isLoading} className="min-w-[8rem]">
                  Save Settings
                </ButtonSubmit>
              </div>
              {/* <button
                className="text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded px-3 py-2 text-center"
                type="submit"
              >
                Save Settings
              </button> */}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Profile;
