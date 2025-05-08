import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate as UseNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext"; // color blind support

const SignUp = () => {
  const [agreed, setAgreed] = useState(false);
  const apiUrl = "http://localhost:5001";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const navigate = UseNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const { isColorBlindMode } = useTheme();

  const inputTextColor = isColorBlindMode ? "text-[#002366]" : "text-gray-900";
  const inputBg = isColorBlindMode ? "bg-[#FFFDD0]" : "bg-white";
  const outlineColor = isColorBlindMode
    ? "focus:outline-[#002366]"
    : "focus:outline-indigo-600";

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!devMode) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (formData.username.includes(" ")) {
        toast.error("Username should not contain spaces");
        return;
      }
      if (!validatePassword(formData.password)) {
        toast.error("Password does not meet security requirements");
        return;
      }
    }

    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.dismiss(toastId);
        toast.error(errorData.message || "Registration failed");
        return;
      }
      toast.dismiss(toastId);
      toast.success("Registered! Redirecting...");
      setTimeout(() => navigate("/Login"), 1000);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#002366]">
      <ToastContainer />
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-5xl">Register</h2>
          <p className="mt-2 text-lg">
            Detailed information about the Help near you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block font-semibold text-sm"
              >
                First name
              </label>
              <input
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-base ${inputBg} ${inputTextColor} outline-1 -outline-offset-1 placeholder:text-gray-400 ${outlineColor}`}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-semibold text-sm">
                Last name
              </label>
              <input
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-base ${inputBg} ${inputTextColor} outline-1 -outline-offset-1 placeholder:text-gray-400 ${outlineColor}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="username" className="block font-semibold text-sm">
                Username
              </label>
              <input
                name="username"
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-base ${inputBg} ${inputTextColor} outline-1 -outline-offset-1 placeholder:text-gray-400 ${outlineColor}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block font-semibold text-sm">
                Email
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-base ${inputBg} ${inputTextColor} outline-1 -outline-offset-1 placeholder:text-gray-400 ${outlineColor}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="password" className="block font-semibold text-sm">
                Password
              </label>
              <div className="relative mt-2.5">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    setIsPasswordValid(validatePassword(e.target.value));
                  }}
                  className={`block w-full pr-10 rounded-md px-3.5 py-2 text-base ${inputBg} ${inputTextColor} outline-1 -outline-offset-1 ${
                    isPasswordValid ? "outline-gray-300" : "outline-red-500"
                  } placeholder:text-gray-400 ${outlineColor}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-[#002366]" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-[#002366]" />
                  )}
                </button>
              </div>
              {!isPasswordValid && (
                <p className="text-red-500 text-sm mt-2">
                  Password must be at least 8 characters, include uppercase,
                  lowercase, number, and special character.
                </p>
              )}
            </div>
          </div>

          <Field className="flex gap-x-4 sm:col-span-2 mt-6">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002366] data-checked:bg-[#002366]"
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className="size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 group-data-checked:translate-x-3.5"
              />
            </Switch>
            <Label className="text-sm text-[#002366]">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold underline">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="devMode"
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="devMode" className="text-sm">
              Development mode (disable validations)
            </label>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-[#715FFF] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-[#5e49cc]"
            >
              {loading ? "Saving..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
