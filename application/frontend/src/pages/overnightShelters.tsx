import { useState } from "react";
import { Map } from "../assets";

const facilities = [
  {
    id: 1,
    name: "Kyles Haven Shelter",
    address: "124 Castro Street",
    phone: "(334) 456-5632",
    website: "https://www.KylesHavenShelter.org",
    description:
      "Kyle’s Haven Shelter provides 24/7 support, offering a safe, welcoming environment with meals, emergency beds, and access to essential resources for individuals experiencing homelessness .",
    quickInfo: [
      "📞 Emergency:(334) 456-5632",
      "🛏️ Beds Available: 10",
      "💬 Language Support: English, Spanish",
      "⌛️ 24/7 walkins",
    ],
  },
  {
    id: 2,
    name: "Karlas Refuge",
    address: "562 Church Ave",
    phone: "(555) 887-9876",
    website: "https://www.KarlasRefuge.org",
    description:
      "Karla's Refuges focuses on providing basic necessities to those who are in need of a safe place to sleep.",
    quickInfo: [
      "📞 Emergency: (555) 321–1234",
      "📆 Can book a bed ahead of time",
      "💬 Language Support: English, Vietnamese",
      "♿ Accessibility: Ramp Access",
    ],
  },
  {
    id: 3,
    name: "Ayeshas Hope Shelter  ",
    address: "124 2nd Street",
    phone: "(789) 654–3210",
    website: "https://www.AyeshasHopeShelter.org",
    description:
      "Ayeshas Hope Shelter center supports all communities providing a warm place to sleep and relief from hard weather envirnment",
    quickInfo: [
      "📞 Emergency: (765) 614–1120",
      "🛏️ provides blankets to take",
      "🍲 warm meals if needed",
      "💬 Language Support: English, Spanish",
      "♿ Accessible Building",
    ],
  },
  {
    id: 4,
    name: "Anshaj's shelter",
    address: "Civic Center",
    phone: "(989) 334-8567",
    website: "https://www.Anshaj'sShelter.org",
    description:
      "Anshaj's shelter is open to anyone looking for a bed, a place to rest, and a sense of community. ",
    quickInfo: [
      "📞 Emergency: (989) 334-8567",
      "👥 counseling Services",
      "♿ Wheelchair Accessible",
      "💼 Job Assistance",
    ],
  },
  {
    id: 5,
    name: "Ayesha's Hope Shelter",
    address: "124 Main Street",
    phone: "(112) 4098–0500 ",
    website: "https://www.ayeshaHopeShelter.org",
    description:
      "Ayeshs's  Hope Shelters aims to provide a place to rest to those who are unable to find one. LGBT+ friendly.",
    quickInfo: [
      "📞 Emergency: (112) 4098–0500",
      "👕 Laundry Facilities",
      "🚿 Access to bathrooms and showers",
      "💬 Language Support: English",
      "♿ Wheelchair Accessible",
    ],
  },
];
export default function OvernightShelters() {
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
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">
          Overnight Shelters
        </h2>

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
            <p className="text-med  text-gray-300"></p>
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
