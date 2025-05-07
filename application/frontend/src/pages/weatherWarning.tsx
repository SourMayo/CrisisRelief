import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function WeatherWarning() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [customLocation, setCustomLocation] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [facilities, setFacilities] = useState([
    { id: 1, name: "San Francisco" },
    { id: 2, name: "New York" },
    { id: 3, name: "Alaska" },
    { id: 4, name: "Bayview, San Francisco" },
    { id: 5, name: "Texas" },
  ]);

  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<string[]>([]);
  const [cityDisplayName, setCityDisplayName] = useState("San Francisco");
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    37.7749, -122.4194,
  ]);

  const fetchWeather = async (cityName: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          cityName
        )}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        alert("City or ZIP not found!");
        return;
      }

      setCityDisplayName(data.city.name);
      setMapCenter([data.city.coord.lat, data.city.coord.lon]);

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
            time: `${formattedHour}${ampm} ${icon}`,
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
          return `☁︎ ${name} ${temp}°F – ${description}`;
        });

      setHourlyForecast(hourly);
      setWeeklyForecast(weekly);
    } catch (err) {
      alert("Something went wrong!");
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
      const exists = facilities.find(
        (f) => f.name.toLowerCase() === search.toLowerCase()
      );
      if (!exists) {
        const newId = facilities.length + 1;
        setFacilities([...facilities, { id: newId, name: search }]);
        setSelectedId(newId);
        setTimeout(() => {
          sidebarRef.current?.scrollTo({
            top: sidebarRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      } else {
        const found = facilities.find((f) => f.name === exists.name);
        setSelectedId(found?.id || 1);
      }
      fetchWeather(search);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#66B2EF] to-[#AC94FB] relative">
      <aside
        ref={sidebarRef}
        className={`$${
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
          className="mt-2 w-full bg-[#1F2A40] hover:bg-gradient-to-r hover:from-[#715FFF] hover:to-[#66B2EF] text-white font-semibold py-2 rounded"
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
            className={`w-full text-left p-4 rounded-lg font-medium transform transition duration-200 hover:scale-105 ${
              selectedId === f.id && !customLocation
                ? "bg-[#715FFF] text-white border-l-4 border-white"
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
                  className="bg-gray-700 text-white rounded-lg p-3 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105"
                >
                  <span>{hour.time}</span>
                  <span className="text-base font-bold">{hour.temp}</span>
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
              <MapContainer
                center={mapCenter}
                zoom={10}
                className="w-full h-full rounded-md"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter} />
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
