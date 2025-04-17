import { useState } from "react";
import mapImage from "../assets/icons/map.jpg";

export default function WeatherWarning() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-gray-800 rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-white mb-4">Food Banks</h2>
        <ul className="space-y-2">
          <li className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-2 rounded">
            Downtown SF
          </li>
          <li className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-2 rounded">
            Mission District
          </li>
          <li className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-2 rounded">
            Sunset
          </li>
          <li className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-2 rounded">
            Bayview
          </li>
          <li className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-2 rounded">
            Tenderloin
          </li>
        </ul>
      </aside>

      {/* Main content remains unchanged */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-[#BCD3F2] text-center mb-6">
            Weather Forecast – April 16, 2025
          </h1>

          {/* Hourly Forecast */}
          <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-xl font-semibold text-[#BCD3F2] mb-4">
              Hourly Forecast (1PM – 1AM)
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 text-sm text-center">
              {[
                "1PM",
                "2PM",
                "3PM",
                "4PM",
                "5PM",
                "6PM",
                "7PM",
                "8PM",
                "9PM",
                "10PM",
                "11PM",
                "12AM",
              ].map((hour, index) => (
                <div key={index} className="bg-gray-800 text-white rounded p-2">
                  <div>{hour}</div>
                  <div>🌤️ 65°F</div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Forecast */}
          <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-xl font-semibold text-[#BCD3F2] mb-4">
              Weekly Outlook
            </h2>
            <ul className="space-y-2 text-white">
              <li>Monday – ☁️ Cloudy, 63°F / 52°F</li>
              <li>Tuesday – 🌧️ Light Rain, 60°F / 50°F</li>
              <li>Wednesday – ☀️ Sunny, 68°F / 53°F</li>
              <li>Thursday – 🌤️ Partly Cloudy, 66°F / 55°F</li>
              <li>Friday – 🌦️ Scattered Showers, 61°F / 51°F</li>
              <li>Saturday – ☁️ Overcast, 62°F / 50°F</li>
              <li>Sunday – 🌞 Clear Skies, 70°F / 54°F</li>
            </ul>
          </section>

          {/* Map Section */}
          <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-[#BCD3F2] mb-4">
              San Francisco Weather Map
            </h2>
            <img
              src={mapImage}
              alt="San Francisco Map"
              className="w-full rounded-lg"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
