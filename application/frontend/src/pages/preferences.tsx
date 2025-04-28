import { useState } from "react";

const Preferences = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [language, setLanguage] = useState("English");
  const [mapProvider, setMapProvider] = useState("Google Maps");

  return (
    <div className="@container min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      {/* Page Heading */}
      <h1 className="pt-8 pb-4 text-3xl md:text-4xl text-center font-semibold text-[#1F2A40]">
        Preferences
      </h1>

      {/* Preferences Prompt */}
      <p className="pb-8 px-4 text-center italic text-[#1F2A40] text-lg md:text-xl">
        Manage your application settings
      </p>

      {/* Preferences Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-8 max-w-4xl mx-auto">
        {/* Language Preference */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Language</h3>
          <select
            className="mt-2 border rounded p-2 text-gray-700"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Interface Preference */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Interface</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700">Dark Mode</span>
            <button
              className={`w-14 h-8 rounded-full transition ${darkMode ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${darkMode ? "translate-x-6" : "translate-x-1"}`}
              ></div>
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700">Email Alerts</span>
            <button
              className={`w-14 h-8 rounded-full transition ${emailAlerts ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setEmailAlerts(!emailAlerts)}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${emailAlerts ? "translate-x-6" : "translate-x-1"}`}
              ></div>
            </button>
          </div>
        </div>

        {/* Map Provider */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-800">Map Provider</h3>
          <select
            className="mt-2 border rounded p-2 text-gray-700"
            value={mapProvider}
            onChange={(e) => setMapProvider(e.target.value)}
          >
            <option>Google Maps</option>
            <option>Apple Maps</option>
          </select>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="text-center pb-12">
        <button className="bg-[#1F2A40] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Preferences;
