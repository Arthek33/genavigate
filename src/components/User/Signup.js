import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertContext";
import { registerUser } from "../../utils/api";
import ButtonSubmit from "../ButtonSubmit";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { name, email, password, passwordConfirm } = data;
      await registerUser(name, email, password, passwordConfirm);
      showAlert("Registered successfully", 5000, "success");
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      showAlert(
        err.response ? err.response.data.message : err.message,
        5000,
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center grow bg-gray-100 dark:bg-gray-800 min-h-[calc(100vh-65px)]">
      <div className="p-6 mx-4 mb-20 max-w-sm w-full bg-white dark:bg-gray-700 rounded shadow-md animate-fade-in-up animation-fill">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:bg-gray-600 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:bg-gray-600 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:bg-gray-600 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password Confirmation Field */}
          <div>
            <input
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:bg-gray-600 dark:text-white"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <div>
            <ButtonSubmit isLoading={isLoading}>Sign Up</ButtonSubmit>
            {/* <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded px-3 py-2 text-center"
            >
              Sign Up
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
