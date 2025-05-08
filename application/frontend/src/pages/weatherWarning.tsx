import { useState, useEffect } from "react";
import { Map } from "../assets";

const facilities = [
  { id: 1, name: "San Francisco" },
  { id: 2, name: "Mission District" },
  { id: 3, name: "Sunset" },
  { id: 4, name: "Bayview" },
  { id: 5, name: "Tenderloin" },
];

export default function WeatherWarning() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [customLocation, setCustomLocation] = useState<string | null>(null);

  const [hourlyForecast, setHourlyForecast] = useState<string[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<string[]>([]);
  const [cityDisplayName, setCityDisplayName] = useState("San Francisco");

  const fetchWeather = async (cityName: string) => {
    try {
      const res = await fetch(
        `http://localhost:5001/weather?city=${encodeURIComponent(cityName)}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!data || !data.location || !data.current) {
        alert("City or ZIP not found!");
        return;
      }

      setCityDisplayName(data.location.name);

      // Generate mock hourly info from "current"
      const hourly = [
        `🌡️ Temp: ${data.current.temp_f}°F`,
        `💨 Wind: ${data.current.wind_mph} mph ${data.current.wind_dir}`,
        `💧 Humidity: ${data.current.humidity}%`,
        `☁️ Condition: ${data.current.condition.text}`,
        `🌫️ Visibility: ${data.current.vis_miles} mi`,
        `🔽 Feels Like: ${data.current.feelslike_f}°F`,
        `🔬 AQI (EPA): ${data.current.air_quality["us-epa-index"]}`,
      ];

      // Weekly forecast mock until you support real forecast
      const weekly = [...Array(7)].map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() + i);
        const name = day.toLocaleDateString("en-US", { weekday: "long" });
        return `☁︎ ${name} ${data.current.temp_f}°F`;
      });

      setHourlyForecast(hourly);
      setWeeklyForecast(weekly);
    } catch {
      alert("Something went wrong fetching weather!");
    }
  };
  useEffect(() => {
    const selectedCity =
      facilities.find((f) => f.id === selectedId)?.name || "San Francisco";
    setCityDisplayName(selectedCity);
    fetchWeather(selectedCity);
  }, [selectedId]);

  const handleSearch = () => {
    if (search.trim()) {
      setCustomLocation(search);
      fetchWeather(search);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB] relative">
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-[#1F2A40] text-white py-3 text-xl font-semibold tracking-wide"
        >
          {sidebarOpen ? "▲ Hide Facilities" : "▼ Show Facilities"}
        </button>
      </div>

      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">
          Weather Forecast
        </h2>

        <input
          type="text"
          placeholder="Search any city or zip..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-[#1F2A40] hover:bg-[#27354F] text-white font-semibold py-2 rounded"
        >
          + Add Location
        </button>

        {facilities.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedId(f.id);
              setCustomLocation(null);
              setSidebarOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg font-medium transition ${
              selectedId === f.id && !customLocation
                ? "bg-[#715FFF] text-white"
                : "bg-[#1F2A40] hover:bg-[#27354F]"
            }`}
          >
            <h3 className="text-lg font-semibold">{f.name}</h3>
          </button>
        ))}
      </aside>

      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          <h1 className="text-3xl font-bold text-black text-center mb-6">
            {cityDisplayName}
          </h1>

          {/* Hourly Forecast */}
          <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-lg font-small text-[#BCD3F2] mb-4 text-left">
              Hourly Forecast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 text-sm text-center">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="bg-gray-700 text-white rounded-lg p-3 flex items-center justify-center"
                >
                  {hour}
                </div>
              ))}
            </div>
          </section>

          {/* Weekly + Map */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
            <section className="bg-gray-800 bg-opacity-60 rounded-lg p-8 shadow-md w-full lg:w-1/2 xl:w-1/2">
              <h2 className="text-xl font-normal text-[#BCD3F2] mb-6 text-left">
                10 - Day Forecast
              </h2>
              <ul className="text-white text-left divide-y divide-gray-500">
                {weeklyForecast.map((forecast, index) => (
                  <li key={index} className="py-3 text-lg">
                    {forecast}
                  </li>
                ))}
              </ul>
            </section>

            <div className="bg-[#1F2A40] rounded-xl shadow-md p-6 h-[500px] w-full lg:w-1/2 xl:w-1/2">
              <img
                src={Map}
                alt="Map preview"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
