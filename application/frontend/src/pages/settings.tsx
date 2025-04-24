import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="@container min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB]">
      {/* Page Heading */}
      <h1 className="pt-8 pb-4 text-3xl md:text-4xl text-center font-semibold text-[#1F2A40]">
        Account Settings
      </h1>

      {/* Settings Prompt */}
      <p className="pb-8 px-4 text-center italic text-[#1F2A40] text-lg md:text-xl">
        Manage your account preferences and settings
      </p>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-8 max-w-4xl mx-auto">
        {[
          {
            to: "/profile-settings",
            emoji: "👤",
            title: "Profile Settings",
            description: "Update your personal information and preferences",
          },
          {
            to: "/notification-settings",
            emoji: "🔔",
            title: "Notifications",
            description: "Manage your notification preferences",
          },
          {
            to: "/security-settings",
            emoji: "🔒",
            title: "Security",
            description: "Change password and security settings",
          },
          {
            to: "/app-preferences",
            emoji: "⚙️",
            title: "Preferences",
            description: "Customize your application preferences",
          },
        ].map(({ to, emoji, title, description }) => (
          <Link
            to={to}
            key={title}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <span className="text-4xl" aria-hidden="true">
                  {emoji}
                </span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#1F2A40] transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm italic">
                  {description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;
