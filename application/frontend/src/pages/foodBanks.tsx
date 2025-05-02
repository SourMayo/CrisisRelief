import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const facilities = [
  {
    id: 1,
    name: "Karla's Family Help",
    address: "124 Main Street",
    type: "Family Food Bank",
    phone: "(123) 456–7890",
    website: "https://www.karlasfamilyhelp.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Karla’s Family Help offers weekly grocery pickups, nutritional programs for families, and emergency food assistance for those in need.",
    quickInfo: [
      "📞 Emergency: (123) 456–7890",
      "🧑‍⚕️ On-Site Staff: Doctors, Nurses, Support",
      "🧠 Mental Health: Available",
      "💬 Language Support: English, Spanish",
      "♿ Accessibility: Wheelchair Access",
      "📟 Crisis Hotline: (800) 123–HELP",
    ],
  },
  {
    id: 2,
    name: "Kyle's Family Food Help",
    address: "562 Oak Ave",
    type: "Family Food Bank",
    phone: "(555) 321–1234",
    website: "https://www.kylesfood.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Kyle's Family Food Help focuses on child-friendly meals and nutritional boxes for low-income households, with weekend pickup hours.",
    quickInfo: [
      "📞 Emergency: (555) 321–1234",
      "🚚 Weekend Pickups Available",
      "💬 Language Support: English, Vietnamese",
      "♿ Accessibility: Ramp Access",
    ],
  },
  {
    id: 3,
    name: "Geoart's Woman’s Help",
    address: "124 2nd Street",
    type: "Woman's Food Bank",
    phone: "(789) 654–3210",
    website: "https://www.geoartswomenshelp.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Geoart’s center supports women and children with nutritious meals, hygiene supplies, and mental wellness check-ins.",
    quickInfo: [
      "📞 Emergency: (789) 654–3210",
      "🧑‍🤝‍🧑 Women & Children Services",
      "🧼 Hygiene Kits Provided",
      "💬 Language Support: English, Spanish, Tagalog",
      "♿ Accessible Building",
    ],
  },
  {
    id: 4,
    name: "Anshaj's Veteran Food Bank",
    address: "124 Vatts Street",
    type: "Veterans Food Bank",
    phone: "(888) 444–2020",
    website: "https://www.veteranrelief.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Serving our veterans with honor, Anshaj’s Food Bank offers military-friendly meals, PTSD support, and dedicated volunteer staff.",
    quickInfo: [
      "📞 Emergency: (888) 444–2020",
      "🎖 Veteran Support Services",
      "🧠 PTSD Counseling Available",
      "♿ Wheelchair Accessible",
    ],
  },
  {
    id: 5,
    name: "Ayesha's Food for Homeless",
    address: "124 Francis Street",
    type: "Homeless Food Bank",
    phone: "(999) 222–0000",
    website: "https://www.ayeshafoodbank.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Daily walk-in service for those experiencing homelessness, with warm meals, hydration, and helpful staff around the clock.",
    quickInfo: [
      "📞 Emergency: (999) 222–0000",
      "🍲 Daily Hot Meals",
      "🚿 Hygiene Services Nearby",
      "💬 Language Support: English",
      "♿ ADA Accessible",
    ],
  },
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function FoodBanks() {
  const [selectedId, setSelectedId] = useState(facilities[0].id);
  const selectedFacility = facilities.find((f) => f.id === selectedId)!;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfeXWLWeO3WA15MY8AD55aprDhvuTOKFQ", 
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB] relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-[#1F2A40] text-white py-3 text-xl font-semibold tracking-wide"
        >
          {sidebarOpen ? "▲ Hide Facilities" : "▼ Show Facilities"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">Food Banks</h2>

        {/* Close button on mobile only */}
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
            className={`w-full text-left p-4 rounded-lg font-medium transition ${
              selectedId === f.id
                ? "bg-[#715FFF] text-white"
                : "bg-[#1F2A40] hover:bg-[#27354F]"
            }`}
          >
            <h3 className="text-lg font-semibold">{f.name}</h3>
            <p className="text-med ">{f.address}</p>
            <span className="text-med text-indigo-300">{f.type}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          {/* Info Box */}
          <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 h-[300px] space-y-2">
            <h1 className="text-xl font-bold flex items-center gap-2">
              🏥 {selectedFacility?.name}
            </h1>
            <p className="text-med text-gray-300">
              {selectedFacility?.address}
            </p>
            <p className="text-med  text-gray-300">
              Type: {selectedFacility?.type}
            </p>
            <p className="text-med text-gray-300">
              Phone: {selectedFacility?.phone}
            </p>
            <p className="text-med text-gray-300">
              {" "}
              Description : {selectedFacility?.description}
            </p>
            <p className="text-med text-gray-300">
              Website:{" "}
              <a
                href={selectedFacility?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                {selectedFacility?.website}
              </a>
            </p>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Hours Box */}
            <div className="flex-1 bg-[#1F2A40] text-white rounded-xl shadow-md p-6 h-[720px]">
              <h2 className="text-[20px] font-bold mb-4">Hours Open</h2>
              <ul className="space-y-2 text-med leading-relaxed">
                <li>Monday : 10:00 AM – 8:00 PM</li>
                <li>Tuesday : 10:00 AM – 8:00 PM</li>
                <li>Wednesday : 10:00 AM – 8:00 PM</li>
                <li>Thursday : 10:00 AM – 8:00 PM</li>
                <li>Friday : 10:00 AM – 8:00 PM</li>
                <li>Saturday : 10:00 AM – 8:00 PM</li>
                <li>Sunday : 10:00 AM – 8:00 PM</li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Quick Info */}
              <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 h-[300px]">
                <h2 className="text-xl font-bold mb-4">Quick Info</h2>
                <ul className="space-y-3 text-med leading-relaxed">
                  {selectedFacility?.quickInfo.map((info, i) => (
                    <li key={i}>{info}</li>
                  ))}
                </ul>
              </div>

              {/* Map Box */}
              <div className="bg-[#1F2A40] rounded-xl shadow-md p-4 h-[400px]">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                      lat: selectedFacility.lat,
                      lng: selectedFacility.lng,
                    }}
                    zoom={14}
                  >
                    <Marker
                      position={{
                        lat: selectedFacility.lat,
                        lng: selectedFacility.lng,
                      }}
                    />
                  </GoogleMap>
                ) : (
                  <div className="text-white">Loading map...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
