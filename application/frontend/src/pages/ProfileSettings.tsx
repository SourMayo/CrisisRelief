import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

const ProfileSettings = () => {
  const [currentRole, setCurrentRole] = useState("User");

  const navigate = useNavigate();

  const addressInfo = [
    {
      name: "address",
      label: "Address",
    },
    {
      name: "apartment",
      label: "Apartment, suite, etc.",
    },
    {
      name: "city",
      label: "City",
    },
    {
      name: "zip",
      label: "ZIP Code",
    },
    {
      name: "state",
      label: "State",
    },
  ]

  const [addressForm] = useState({
    address: "",
    apartment: "",
    city: "",
    zip: "",
    state: "",
  });

  const [roleForm] = useState({
    role: "",
    comments: "",
  });

  /*
  ~~ There is no backend for the forms yet ~~



  const [roleRequestForm, setRoleRequestForm] = useState ({
    role: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddressForm({
        ...addressForm,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await fetch(
          // TODO - No backend yet
          // "http://crisisrelief.duckdns.org:5001/profile-settings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addressForm),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "Could not set address");
          throw new Error(errorData.error || "Could not set address");
        }
  
        toast.success("Address Changed!", {
          onClose: () => {
            window.dispatchEvent(new Event("address"));
            navigate("/profile");
          },
          autoClose: 500,
        });
      } catch (error) {
        console.error("Address error:", error);
      } finally {
        setLoading(false);
      }
    };
  */

  return (
    <div className="@container min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      {/* Page Heading */}
      <h1 className="pt-8 pb-4 text-3xl md:text-4xl text-center font-semibold text-[#1F2A40]">
        Profile Settings
      </h1>

      {/* Preferences Prompt */}
      <p className="pb-8 px-4 text-center italic text-[#1F2A40] text-lg md:text-xl">
        Manage your account
      </p>

      {/* Preferences Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-8 max-w-4xl mx-auto">
      
        {/* Address Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Current Address</h3>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <span className="text-gray-700">Change your location!</span>
            

            {/* Each input field */}
            {addressInfo.map (({ name, label }) => (
              <div className="sm:col-span-2">
                <label
                  htmlFor={name}
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  {label}
                </label>
                <div className="mt-2.5">
                  <input
                    id={name}
                    name={name}
                    type="text"
                    autoComplete="off"
                    value={addressForm[name as keyof typeof addressForm]}
                    // onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Role Request */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Role Request</h3>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <span className="text-gray-700">Work for CrisisRelief!</span>
            

            <div className="sm:col-span-2 mt-6">

              <select
                className="mt-2 border rounded p-2 text-gray-700"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              >
                <option>User</option>
                <option>Relief Worker</option>
                <option>Admin</option>
              </select>
            </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="comments"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Reason or Comments
            </label>
            <div className="mt-2.5">
              <textarea
                id="comments"
                name="comments"
                value={roleForm.comments}
                rows={10}
                // onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          </div>
        </div>

      </div>

      {/* Save Changes Button */}
      <div className="text-center pb-12">
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#1F2A40] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
