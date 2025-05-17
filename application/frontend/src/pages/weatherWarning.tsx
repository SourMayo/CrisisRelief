import { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";

// Define language type
type Lang = "en" | "vi";

// Translation strings for English and Vietnamese
const translations: Record<Lang, { [key: string]: string }> = {
  en: {
    weatherForecast: "Weather Forecast",
    searchPlaceholder: "Search any city or zip...",
    addLocation: "+ Add Location",
    addToSidebar: '➕ Add "{0}" to Sidebar',
    hourlyForecast: "Hourly Forecast",
    weeklyForecast: "Weekly Forecast",
    detailedForecast: "Detailed Forecast",
    selectDayForDetails: "Select a day for detailed forecast",
    cityNotFound: "City or ZIP not found!",
    weatherError: "Something went wrong while fetching weather!",
    weatherLoaded: "Weather loaded. Click below to add!",
    locationAdded: "{0} added to the list!",
    language: "Language",
  },
  vi: {
    weatherForecast: "Dự Báo Thời Tiết",
    searchPlaceholder: "Tìm kiếm thành phố hoặc mã zip...",
    addLocation: "+ Thêm Địa Điểm",
    addToSidebar: '➕ Thêm "{0}" vào Thanh Bên',
    hourlyForecast: "Dự Báo Theo Giờ",
    weeklyForecast: "Dự Báo Theo Tuần",
    detailedForecast: "Dự Báo Chi Tiết",
    selectDayForDetails: "Chọn một ngày để xem dự báo chi tiết",
    cityNotFound: "Không tìm thấy thành phố hoặc mã ZIP!",
    weatherError: "Đã xảy ra lỗi khi tải dữ liệu thời tiết!",
    weatherLoaded: "Đã tải dữ liệu thời tiết. Nhấp vào bên dưới để thêm!",
    locationAdded: "{0} đã được thêm vào danh sách!",
    language: "Ngôn ngữ",
  },
};

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
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

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
        const name = date.toLocaleDateString(lang === "en" ? "en-US" : "vi-VN", { weekday: "long" });
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
        toast.error(t.cityNotFound);
        return false;
      }

      setCityDisplayName(data.city.name);
      setMapCenter({ lat: data.city.coord.lat, lng: data.city.coord.lon });
      fetchWeatherData(data);
      return true;
    } catch (err) {
      toast.error(t.weatherError);
      return false;
    }
  };

  useEffect(() => {
    const selectedCity =
      facilities.find((f) => f.id === selectedId)?.name || "San Francisco";
    setCityDisplayName(selectedCity);
    fetchWeather(selectedCity);
  }, [selectedId, lang]);

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
      toast.error(t.cityNotFound);
      return;
    }

    setCustomLocation(search);
    setCityDisplayName(data.city.name);
    setMapCenter({ lat: data.city.coord.lat, lng: data.city.coord.lon });
    fetchWeatherData(data);

    if (!exists) {
      toast.success(t.weatherLoaded);
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
      toast.success(t.locationAdded.replace("{0}", customLocation));
      setCustomLocation(null);
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
        {/* Translated header */}
        <h2 className="text-[30px] font-bold text-black mb-4">
          {t.weatherForecast}
        </h2>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-[#1F2A40] hover:bg-gradient-to-r hover:from-[#715FFF] hover:to-[#66B2EF] text-white font-semibold py-2 rounded"
        >
          {t.addLocation}
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
        {customLocation &&
          !facilities.some(
            (f) => f.name.toLowerCase() === customLocation.toLowerCase()
          ) && (
            <button
              onClick={handleAddLocation}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              {t.addToSidebar.replace("{0}", customLocation)}
            </button>
          )}
          
        {/* Language Switcher */}
        <div className="mt-4">
          <label className="block text-black font-semibold mb-2">
            {t.language}:
          </label>
          <select
            onChange={(e) => setLang(e.target.value as Lang)}
            value={lang}
            className="p-2 rounded border border-gray-300 bg-white text-gray-800 w-full"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          <h1 className="text-3xl font-bold text-black text-center mb-6">
            {cityDisplayName}
          </h1>

          <section className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mb-8 shadow-md">
            {/* Translated section title */}
            <h2 className="text-lg font-small text-[#BCD3F2] mb-4 text-left">
              {t.hourlyForecast}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 text-sm text-center">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="bg-gray-700 text-white rounded-lg p-3 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105"
                >
                  <span className="text-sm font-semibold">{hour.time}</span>
                  <span className="text-base font-bold">{hour.temp}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
            <section className="bg-gray-800 bg-opacity-60 rounded-lg p-8 shadow-md w-full lg:w-1/2 xl:w-1/2">
              {/* Changed to weekly forecast instead so it's simpler */}
              <h2 className="text-xl font-normal text-[#BCD3F2] mb-6 text-left">
                {t.weeklyForecast}
              </h2>
              <div className="space-y-4">
                {weeklyForecast.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`bg-gray-700 text-white rounded-lg p-4 flex justify-between items-center cursor-pointer transform transition duration-300 hover:scale-101 ${
                      selectedDayIndex === index ? "ring-2 ring-blue-400" : ""
                    }`}
                  >
                    <span className="font-medium">{day.name}</span>
                    <span className="font-bold">{day.temp}°F</span>
                  </div>
                ))}
              </div>
            </section>

                
            <section className="bg-gray-800 bg-opacity-60 rounded-lg p-8 shadow-md w-full lg:w-1/2 xl:w-1/2">
              {/* Added new section title */}
              <h2 className="text-xl font-normal text-[#BCD3F2] mb-6 text-left">
                {t.detailedForecast}
              </h2>
              <div className="h-full flex flex-col justify-center">
                {selectedDayIndex !== null && weeklyForecast[selectedDayIndex] ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {weeklyForecast[selectedDayIndex].name}
                    </h3>
                    <div className="space-y-2">
                      {weeklyForecast[selectedDayIndex].details.map(
                        (detail: string, idx: number) => (
                          <p
                            key={idx}
                            className="text-white bg-gray-700 p-2 rounded"
                          >
                            {detail}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-white text-center">
                    {t.selectDayForDetails}
                  </p>
                )}
              </div>
            </section>
          </div>

          {isLoaded && (
            <div className="h-96 rounded-lg overflow-hidden shadow-lg border border-gray-400">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={10}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                  mapTypeControl: true,
                }}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
