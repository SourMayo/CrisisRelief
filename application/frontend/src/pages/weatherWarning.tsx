import { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

export default function WeatherWarning() {
  const { isColorBlindMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [customLocation, setCustomLocation] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [facilities, setFacilities] = useState([
    { id: 1, name: "San Francisco" },
    { id: 2, name: "New York" },
    { id: 3, name: "Alaska" },
    { id: 4, name: "Chicago" },
    { id: 5, name: "Texas" },
  ]);

  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<any[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [cityDisplayName, setCityDisplayName] = useState("San Francisco");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.7749,
    lng: -122.4194,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mainBg = isColorBlindMode
    ? "bg-[#FFFDD0] text-[#002366]"
    : "bg-gradient-to-br from-[#66B2EF] to-[#AC94FB] text-white";
  const sectionBg = isColorBlindMode
    ? "bg-[#F8E474] text-[#002366]"
    : "bg-gray-800 bg-opacity-60 text-white";
  const sideBg = isColorBlindMode
    ? "bg-[#FFFDD0] text-[#002366]"
    : "bg-[#BCD3F2] text-white";
  const highlightBtn = isColorBlindMode
    ? "bg-[#002366] text-yellow-200 font-bold"
    : "bg-[#715FFF] text-white border-l-4 border-white";
  const normalBtn = isColorBlindMode
    ? "bg-[#F8E474] text-[#002366] hover:bg-yellow-300"
    : "bg-[#1F2A40] hover:bg-[#27354F] text-white";
  const forecastCard = isColorBlindMode
    ? "bg-[#F8E474] text-[#002366] border border-[#002366]"
    : "bg-gray-700 text-white";

  const fetchWeatherData = (data: any) => {
    const now = new Date();
    const hourly = data.list
      .filter((entry: any) => new Date(entry.dt_txt) >= now)
      .slice(0, 10)
      .map((entry: any) => {
        const date = new Date(entry.dt_txt);
        const hour = date.getHours();
        const formattedHour = hour % 12 || 12;
        const ampm = hour >= 12 ? "PM" : "AM";
        const temp = Math.round(entry.main.temp);
        const icon = entry.weather[0].main.includes("Rain")
          ? "⛆"
          : entry.weather[0].main.includes("Cloud")
          ? "☁︎"
          : entry.weather[0].main.includes("Clear")
          ? "☀︎"
          : "☁︎";
        return {
          time: `${formattedHour}${ampm}`,
          icon,
          temp: `${temp}°F`,
        };
      });

    const grouped: { [date: string]: any[] } = {};
    data.list.forEach((entry: any) => {
      const day = entry.dt_txt.split(" ")[0];
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(entry);
    });

    const weekly = Object.entries(grouped)
      .slice(0, 10)
      .map(([day, entries]: any) => {
        const noonEntry =
          entries.find((e: any) => e.dt_txt.includes("12:00:00")) ||
          entries[Math.floor(entries.length / 2)];
        const date = new Date(day);
        const name = date.toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(noonEntry.main.temp);
        const description = noonEntry.weather[0].description;
        const detailedHours = entries.map((e: any) => {
          const h = new Date(e.dt_txt);
          const hour = h.getHours();
          const formattedHour = hour % 12 || 12;
          const ampm = hour >= 12 ? "PM" : "AM";
          const temp = Math.round(e.main.temp);
          const desc = e.weather[0].description;
          const icon = desc.includes("rain")
            ? "⛆"
            : desc.includes("cloud")
            ? "☁︎"
            : desc.includes("clear")
            ? "☀︎"
            : "☁︎";
          return `${formattedHour}${ampm}: ${temp}°F – ${icon} ${desc}`;
        });
        return { name, temp, description, details: detailedHours };
      });

    setHourlyForecast(hourly);
    setWeeklyForecast(weekly);
    setSelectedDayIndex(null);
  };

  const fetchWeather = async (cityName: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          cityName
        )}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        toast.error("City or ZIP not found!");
        return false;
      }

      setCityDisplayName(data.city.name);
      setMapCenter({ lat: data.city.coord.lat, lng: data.city.coord.lon });
      fetchWeatherData(data);
      return true;
    } catch (err) {
      toast.error("Something went wrong while fetching weather!");
      return false;
    }
  };

  useEffect(() => {
    const selectedCity =
      facilities.find((f) => f.id === selectedId)?.name || "San Francisco";
    setCityDisplayName(selectedCity);
    fetchWeather(selectedCity);
  }, [selectedId]);

  const handleSearch = async () => {
    if (!search.trim()) return;

    const exists = facilities.find(
      (f) => f.name.toLowerCase() === search.toLowerCase()
    );

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        search
      )}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    const data = await res.json();

    if (data.cod !== "200") {
      toast.error("City or ZIP not found!");
      return;
    }

    setCustomLocation(search);
    setCityDisplayName(data.city.name);
    setMapCenter({ lat: data.city.coord.lat, lng: data.city.coord.lon });
    fetchWeatherData(data);

    if (!exists) {
      toast.success("Weather loaded. Click below to add!");
    } else {
      setSelectedId(exists.id);
      setCustomLocation(null);
    }
  };

  const handleAddLocation = () => {
    if (customLocation) {
      const newId = facilities.length + 1;
      setFacilities([...facilities, { id: newId, name: customLocation }]);
      setSelectedId(newId);
      toast.success(`${customLocation} added to the list!`);
      setCustomLocation(null);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen ${mainBg} relative`}
    >
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 ${sideBg} rounded-lg p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">
          Weather Forecast
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Search any city or zip..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-2 rounded-lg border-2 text-lg placeholder-opacity-80 ${
            isColorBlindMode
              ? "bg-[#F8E474] text-[#002366] placeholder-[#002366] border-[#002366] font-semibold focus:outline-none focus:ring-2 focus:ring-[#002366]"
              : "bg-white text-black placeholder-gray-500 border-gray-300"
          }`}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className={`mt-2 w-full py-2 rounded-lg font-semibold transition ${
            isColorBlindMode
              ? "bg-[#F8E474] text-[#002366] border border-[#002366] hover:bg-yellow-300"
              : "bg-[#1F2A40] text-white hover:bg-[#27354F]"
          }`}
        >
          + Add Location
        </button>

        {/* Optional Add Confirmation */}
        {customLocation &&
          !facilities.some(
            (f) => f.name.toLowerCase() === customLocation.toLowerCase()
          ) && (
            <button
              onClick={handleAddLocation}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              ➕ Add "{customLocation}" to Sidebar
            </button>
          )}

        {/* Location Buttons */}
        {facilities.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedId(f.id);
              setCustomLocation(null);
              setSidebarOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg font-medium transform transition duration-200 hover:scale-105 ${
              selectedId === f.id && !customLocation ? highlightBtn : normalBtn
            }`}
          >
            <h3 className="text-lg font-semibold">{f.name}</h3>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div
          className={`${sideBg} p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6`}
        >
          <h1 className="text-3xl font-bold text-black text-center mb-6">
            {cityDisplayName}
          </h1>

          {/* Hourly */}
          <section className={`${sectionBg} rounded-lg p-6 mb-8 shadow-md`}>
            <h2 className="text-lg font-semibold mb-4 text-left">
              Hourly Forecast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 text-sm text-center">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className={`${forecastCard} rounded-lg p-3 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105`}
                >
                  <span className="text-sm font-semibold">{hour.time}</span>
                  <span className="text-base font-bold">{hour.temp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
            <section
              className={`${sectionBg} rounded-lg p-8 shadow-md w-full lg:w-1/2 xl:w-1/2`}
            >
              <h2 className="text-xl font-semibold mb-6 text-left">
                10 - Day Forecast
              </h2>
              <ul className="divide-y divide-gray-400">
                {weeklyForecast.map((forecast, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`py-3 text-lg cursor-pointer hover:bg-[#002366] hover:text-yellow-100 px-2 rounded transition ${
                      selectedDayIndex === index
                        ? "bg-[#002366] text-yellow-100"
                        : ""
                    }`}
                  >
                    ☁︎ {forecast.name} {forecast.temp}°F –{" "}
                    {forecast.description}
                  </li>
                ))}
              </ul>
              {selectedDayIndex !== null && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Details:</h3>
                  <ul className="pl-4 list-disc space-y-1">
                    {weeklyForecast[selectedDayIndex].details.map(
                      (d: string, i: number) => (
                        <li key={i}>{d}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </section>

            {/* Map */}
            <div
              className={`${sectionBg} rounded-xl shadow-md p-6 h-[500px] w-full lg:w-1/2 xl:w-1/2`}
            >
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapCenter}
                  zoom={11}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
