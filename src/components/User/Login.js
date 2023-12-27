import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AlertContext } from "../../context/AlertContext";
import { loginUser } from "../../utils/api";
import ButtonSubmit from "../Tools/ButtonSubmit";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const response = await loginUser(email, password);
      const { token, data: userData } = response.data;
      // TODO : remove token, since now using httponly cookie
      // Maybe just keep localstorage logic with string variable to see if user logged in
      login(token, userData.user);
      showAlert("Logged in successfully", 5000, "success");
      navigate("/");
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
          Log In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
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
          <div>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:bg-gray-600 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                Password is required
              </p>
            )}
          </div>
          <div>
            <ButtonSubmit isLoading={isLoading} className="w-full">
              Login
            </ButtonSubmit>
            {/* <button
              type="submit"
              // className="w-full bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 dark:hover:bg-orange-700"
              className="w-full text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded px-3 py-2 text-center"
            >
              Login
            </button> */}
          </div>
        </form>
        {errors.error && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-3">
            {errors.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
