import React from "react";
import { useState as UseState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate as UseNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const signUp = () => {
  const [agreed, setAgreed] = UseState(false);
  const apiUrl = "http://crisisrelief.duckdns.org/:5001";
  const [formData, setFormData] = UseState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = UseState(false);
  const [devMode, setDevMode] = UseState(false);
  const navigate = UseNavigate();

  const [showPassword, setShowPassword] = UseState(false);
  const [isPasswordValid, setIsPasswordValid] = UseState(true);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    // Simulate a backend request
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
      toast.success("Request simulated successfully! Redirecting...");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred while registering");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      <ToastContainer />
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 pointer-events-none transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-gray-800 text-5xl">Register</h2>
          <p className="mt-2 text-lg/8 text-gray-700">
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
                className="block text-sm/6 font-semibold text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Username
              </label>
              <div className="mt-2.5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2.5">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    setIsPasswordValid(validatePassword(e.target.value));
                  }}
                  className={`block w-full pr-10 rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 ${
                    isPasswordValid ? "outline-gray-300" : "outline-red-500"
                  } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
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
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      aria-label="Country"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>US</option>
                      <option>CA</option>
                      <option>EU</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="text"
                    placeholder="123-456-7890"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <Field className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-checked:bg-indigo-600"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className="size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm/6 text-gray-700">
                By selecting this, you agree to our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-600 underline hover:text-indigo-800"
                >
                  privacy&nbsp;policy
                </a>
                .
              </Label>
            </Field>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="devMode"
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="devMode" className="text-sm text-gray-700">
              Development mode (disable validations)
            </label>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Saving..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signUp;
