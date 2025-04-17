import { useState } from "react";
import { Map } from "../assets";

const facilities = [
  {
    id: 1,
    name: "Karlas Hospital",
    address: "124 Main Street",
    type: "Medical Care",
    phone: "(123) 456–7890",
    website: "https://www.karlashospital.org",
    description:
      "Karla’s Hospital provides 24/7 general medical services, outpatient care, lab testing, and urgent assistance for non-life-threatening conditions. Walk-ins accepted.",
    quickInfo: [
      "📞 Emergency: (123) 456–7890",
      "🧠 Mental Health Support",
      "💬 Languages: English, Spanish",
      "♿ Accessibility: Wheelchair Access",
      "📟 Crisis Hotline: (800) 123–HELP",
    ],
  },
  {
    id: 2,
    name: "Kyles ER",
    address: "562 Oak Ave",
    type: "ER",
    phone: "(321) 555–6789",
    website: "https://www.kyleser.org",
    description:
      "Kyle’s ER provides rapid emergency care, trauma services, and overnight stabilization. Open 24/7 with ambulance access.",
    quickInfo: [
      "📞 Emergency: (321) 555–6789",
      "🚨 24/7 Trauma Services",
      "🚑 Ambulance Access",
      "💬 Languages: English",
    ],
  },
  {
    id: 3,
    name: "Geoarts Therapy",
    address: "124 2nd Street",
    type: "Mental Health",
    phone: "(415) 222–4444",
    website: "https://www.geoarttherapy.org",
    description:
      "Geoarts Therapy specializes in individual and group counseling, crisis intervention, and mental health support for all ages.",
    quickInfo: [
      "🧠 Counseling Services",
      "💬 Languages: English, Tagalog",
      "📟 Crisis Hotline: (800) 444–HEAL",
      "♿ Accessibility: Yes",
    ],
  },
  {
    id: 4,
    name: "Anshajs General",
    address: "124 Vatts Street",
    type: "Medical Care",
    phone: "(408) 333–7890",
    website: "https://www.anshajsgeneral.org",
    description:
      "Anshajs General provides preventive care, outpatient visits, and family medicine. Walk-ins welcome with no appointment.",
    quickInfo: [
      "📞 Walk-in Friendly",
      "🩺 Family Physicians",
      "💬 Languages: English, Vietnamese",
      "♿ Accessibility: Full Access",
    ],
  },
  {
    id: 5,
    name: "Ayeshas Vet",
    address: "124 Francis Street",
    type: "Veterinarian",
    phone: "(707) 888–9000",
    website: "https://www.ayeshavet.org",
    description:
      "Ayeshas Vet provides comprehensive veterinary care including vaccines, surgery, and emergency services for pets.",
    quickInfo: [
      "🐾 Pet Emergency Services",
      "💉 Vaccinations Available",
      "🚗 Curbside Pickup",
      "♿ Accessibility: Ramp Access",
    ],
  },
];

export default function MedicalResources() {
  const [selectedId, setSelectedId] = useState(facilities[0].id);
  const selectedFacility = facilities.find((f) => f.id === selectedId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-[#DCE7FC] via-[#ADC4EF] to-[#7F9EE3] relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-[#1F2A40] text-white py-3 text-xl font-semibold tracking-wide"
        >
          {sidebarOpen ? "▲ Hide Facilities" : "▼ Show Facilities"}
        </button>
      </div>{" "}
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">Medical Help</h2>

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
              <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 h-[300px] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Quick Info</h2>
                <ul className="space-y-3 text-med leading-relaxed">
                  {selectedFacility?.quickInfo.map((info, i) => (
                    <li key={i}>{info}</li>
                  ))}
                </ul>
              </div>

              {/* Map Box */}
              <div className="bg-[#1F2A40] rounded-xl shadow-md p-4 h-[400px]">
                <img
                  src={Map}
                  alt="Map preview"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
