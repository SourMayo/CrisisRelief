import { useState, useEffect } from "react";
import mapImage from "../assets/icons/map.jpg";

export default function WeatherWarning() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const facilities = [
    { id: 1, name: "Downtown SF", weatherType: "Sunny" },
    { id: 2, name: "Mission District", weatherType: "Rainy" },
    { id: 3, name: "Sunset", weatherType: "Cloudy" },
    { id: 4, name: "Bayview", weatherType: "Foggy" },
    { id: 5, name: "Tenderloin", weatherType: "Windy" },
  ];

  const [selectedId, setSelectedId] = useState(1); // Default to the first location

  const weatherData = {
    1: {
      hourly: [
        "1PM  ☁︎ 65°F", "2PM  ☁︎ 66°F", "3PM  ☁︎ 67°F", "4PM  ☁︎ 68°F",
        "5PM  ☁︎ 69°F", "6PM  ☁︎ 70°F", "7PM  ☁︎ 71°F", "8PM  ☁︎ 72°F",
        "9PM  ☁︎ 73°F", "10PM  ☁︎ 74°F"
      ],
      weekly: [
        "☀︎  Thursday  63°F", "☁︎  Friday  64°F",
        "⛆  Saturday  65°F", "☁︎  Sunday  66°F",
        "☀︎  Monday  67°F", "☁︎  Tuesday  68°F",
        "⛆  Wednesday  69°F", "☀︎ Thursday  70°F",
        "☁︎  Friday  71°F", "☁︎  Saturday  72°F"
      ],
      mapImage: "/images/sf-map-placeholder.png",
    },
    2: {
      hourly: [
        "1PM  ⛆ 58°F", "2PM  ⛆ 59°F", "3PM  ⛆ 60°F", "4PM  ⛆ 61°F",
        "5PM  ⛆ 62°F", "6PM  ⛆ 63°F", "7PM  ⛆ 64°F", "8PM  ⛆ 65°F",
        "9PM  ⛆ 66°F", "10PM  ⛆ 67°F"
      ],
      weekly: [
        "⛆  Day 1  60°F", "⛆  Day 2  57°F",
        "☀︎  Day 3  62°F", "☁︎  Day 4  63°F",
        "⛆  Day 5  64°F", "☀︎  Day 6  65°F",
        "☁︎  Day 7  66°F", "☀︎  Day 8  67°F",
        "⛆  Day 9  68°F", "☁︎  Day 10  69°F"
      ],
      mapImage: "/images/sf-map-placeholder.png",
    },
    3: {
      hourly: [
        "1PM  ☁︎ 62°F", "2PM  ☁︎ 63°F", "3PM  ☁︎ 64°F", "4PM  ☁︎ 65°F",
        "5PM  ☁︎ 66°F", "6PM  ☁︎ 67°F", "7PM  ☁︎ 68°F", "8PM  ☁︎ 69°F",
        "9PM  ☁︎ 70°F", "10PM  ☁︎ 71°F"
      ],
      weekly: [
        "☁︎  Day 1  63°F", "☀︎  Day 2  65°F",
        "☁︎  Day 3  66°F", "☀︎  Day 4  67°F",
        "☀︎  Day 5  68°F", "☁︎  Day 6  69°F",
        "⛆  Day 7  70°F", "☀︎  Day 8  71°F",
        "☁︎  Day 9  72°F", "☀︎  Day 10  73°F"
      ],
      mapImage: "/images/sf-map-placeholder.png",
    },
    4: {
      hourly: [
        "1PM  🌫️ 55°F", "2PM  🌫️ 56°F", "3PM  🌫️ 57°F", "4PM  🌫️ 58°F",
        "5PM  🌫️ 59°F", "6PM  🌫️ 60°F", "7PM  🌫️ 61°F", "8PM  🌫️ 62°F",
        "9PM  🌫️ 63°F", "10PM  🌫️ 64°F"
      ],
      weekly: [
        "🌫️  Day 1  58°F", "☁︎  Day 2  60°F",
        "☀︎  Day 3  62°F", "🌫️  Day 4  64°F",
        "☀︎  Day 5  65°F", "☁︎  Day 6  66°F",
        "🌫️  Day 7  67°F", "☀︎  Day 8  68°F",
        "☁︎  Day 9  69°F", "☀︎  Day 10  70°F"
      ],
      mapImage: "/images/sf-map-placeholder.png",
    },
    5: {
      hourly: [
        "1PM  ༄ 61°F", "2PM  ༄ 62°F", "3PM  ༄ 63°F", "4PM  ༄ 64°F",
        "5PM  ༄ 65°F", "6PM  ༄ 66°F", "7PM  ༄ 67°F", "8PM  ༄ 68°F",
        "9PM  ༄ 69°F", "10PM  ༄ 70°F"
      ],
      weekly: [
        "༄  Day 1  62°F", "༄  Day 2  64°F",
        "☀︎  Day 3  66°F", "☁︎  Day 4  67°F",
        "༄  Day 5  68°F", "☀︎  Day 6  69°F",
        "☁︎  Day 7  70°F", "༄  Day 8  71°F",
        "☀︎  Day 9  72°F", "☁︎  Day 10  73°F"
      ],
      mapImage: "/images/sf-map-placeholder.png",
    },
  };


  useEffect(() => {
    setSelectedId(1); // Ensure that the first location is selected by default
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3] relative">
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-[#1F2A40] text-white py-3 text-xl font-semibold tracking-wide"
        >
          {sidebarOpen ? "▲ Hide Facilities" : "▼ Show Facilities"}
        </button>
      </div>

      <aside
        className={`${sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">Weather Forecast</h2>
        <div className="lg:hidden mb-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-black bg-white rounded px-3 py-1 font-semibold hover:bg-gray-200 transition"
          >
            ▲ Hide Facilities
          </button>
        </div>

        {facilities.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedId(f.id);
              setSidebarOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg font-medium transition ${selectedId === f.id
              ? "bg-[#715FFF] text-white"
              : "bg-[#1F2A40] hover:bg-[#27354F]"
              }`}
          >
            <h3 className="text-lg font-semibold">{f.name}</h3>
            {/* <p className="text-med ">{f.address}</p>
            <span className="text-med text-indigo-300">{f.type}</span> */}
          </button>
        ))}
      </aside>

      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          {selectedId ? (
            <>
              <h1 className="text-3xl font-bold text-black text-center mb-6">
                {facilities.find(f => f.id === selectedId)?.name}
              </h1>

              {/* Hourly Forecast */}
              <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mb-8 shadow-md">
                <h2 className="text-lg font-small text-[#BCD3F2] mb-4 text-left">
                  Hourly Forecast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 text-sm text-center">
                  {weatherData[selectedId]?.hourly.map((hour, index) => (
                    <div key={index} className="bg-gray-700 text-white rounded-lg p-3 flex items-center justify-center">
                      {hour}
                    </div>
                  ))}
                </div>
              </section>

              {/* Container for Weekly and Map sections */}
              <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
                {/* Weekly Forecast */}
                <section className="bg-gray-800 bg-opacity-60 rounded-lg p-8 shadow-md w-full lg:w-1/2 xl:w-1/2">
                  <h2 className="text-xl font-normal text-[#BCD3F2] mb-6 text-left">
                    10 - Day Forecast
                  </h2>
                  <ul className="text-white text-left divide-y divide-gray-500">
                    {weatherData[selectedId]?.weekly.map((forecast, index) => (
                      <li key={index} className="py-3 text-lg">
                        {forecast}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Map Section */}
                <div className="bg-[#1F2A40] rounded-xl shadow-md p-6 h-[500px] w-full lg:w-1/2 xl:w-1/2">
                  <img
                    src={mapImage}
                    alt="Map preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>

            </>
          ) : (
            <h2 className="text-xl font-semibold text-[#BCD3F2] text-center mb-4">
              Please select a location to view weather details.
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}