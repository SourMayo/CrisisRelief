import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Login failed");
        throw new Error(errorData.error || "Login failed");
      }

      toast.success("Login successful!", {
        onClose: () => {
          window.dispatchEvent(new Event("login"));
          navigate("/");
        },
        autoClose: 500,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#002366]">
      <ToastContainer />
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-[#002366] text-5xl">Login</h2>
          <p className="mt-2 text-lg/8 text-[#002366]">
            Who are we helping today?
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Username */}
            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm/6 font-semibold text-[#002366]"
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
                  className="block w-full rounded-md bg-[#E6EEFF] px-3.5 py-2 text-base text-[#002366] outline-1 -outline-offset-1 outline-[#002366] placeholder:text-[#002366] focus:outline-2 focus:-outline-offset-2 focus:outline-[#002366]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm/6 font-semibold text-[#002366]"
              >
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-[#E6EEFF] px-3.5 py-2 text-base text-[#002366] outline-1 -outline-offset-1 outline-[#002366] placeholder:text-[#002366] focus:outline-2 focus:-outline-offset-2 focus:outline-[#002366]"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-[#002366] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002366]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
