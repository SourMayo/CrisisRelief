import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";




async function FindShelters() {
  const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
  
  const request = {
    textQuery: 'Homeless Shelters',
    fields: ['id', 'editorialSummary', 'formattedAddress', 'allowsDogs', 'businessStatus', 'displayName', 'internationalPhoneNumber', 'location', 'photos', 'priceLevel', 'primaryTypeDisplayName', 'rating', 'regularOpeningHours', 'websiteURI', 'userRatingCount'],
    language: 'en-US',
    maxResultCount: 8,
    locationBias: { lat: 37.4161493, lng: -122.0812166 }, //Center on SF
    region: 'us',
  };

  const { places } = await Place.searchByText(request);

  if (places.length > 0) {
    console.log(places.length);
    var offset = 10;
    places.forEach(place => {
      var newLocation = {
        id: offset,
        name: place.displayName ?? 'Name Unavaiable',
        address: place.formattedAddress ?? 'Address Unavaiable',
        phone: place.internationalPhoneNumber ?? place.nationalPhoneNumber ?? 'Number Unavailable',
        website: place.websiteURI ?? 'Website Unavailable',
        lat: place.location?.lat()!,
        lng: place.location?.lng()!,
        description: place.editorialSummary ?? 'Description Unavailable',
        hours: [
          place.regularOpeningHours?.weekdayDescriptions[0] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[1] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[2] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[3] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[4] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[5] ?? 'Day Unavailable',
          place.regularOpeningHours?.weekdayDescriptions[6] ?? 'Day Unavailable',
        ],
        quickInfo: [
          "📞 Emergency:" + place.internationalPhoneNumber,
          "🛏️ Beds Available: " + "Unknown",
          "💬 Language Support: English, Spanish",
          "⌛️ 24/7 walkins",
        ],
      }
      console.log(place.regularOpeningHours?.weekdayDescriptions[0]);
      facilities.push(newLocation);
      offset++;
    });
  } else {
    console.log('No results');
  }
}
window.onload = FindShelters;
document.addEventListener("load", FindShelters);
var facilities = [
  {
    id: 1,
    name: "Kyles Haven Shelter",
    address: "124 Castro Street",
    phone: "(334) 456-5632",
    website: "https://www.KylesHavenShelter.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Kyle’s Haven Shelter provides 24/7 support, offering a safe, welcoming environment with meals, emergency beds, and access to essential resources for individuals experiencing homelessness .",
    quickInfo: [
      "📞 Emergency:(334) 456-5632",
      "🛏️ Beds Available: 10",
      "💬 Language Support: English, Spanish",
      "⌛️ 24/7 walkins",
    ],
    hours:[
      "Monday : 10:00 AM – 8:00 PM", 
      "Tuesday : 10:00 AM – 8:00 PM", 
      "Wednesday : 10:00 AM – 8:00 PM", 
      "Thursday : 10:00 AM – 8:00 PM", 
      "Friday : 10:00 AM – 8:00 PM",
      "Saturday : 10:00 AM – 8:00 PM",
      "Sunday : 10:00 AM – 8:00 PM"
    ],
  },
  {
    id: 2,
    name: "Karlas Refuge",
    address: "562 Church Ave",
    phone: "(555) 887-9876",
    website: "https://www.KarlasRefuge.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Karla's Refuges focuses on providing basic necessities to those who are in need of a safe place to sleep.",
    quickInfo: [
      "📞 Emergency: (555) 321–1234",
      "📆 Can book a bed ahead of time",
      "💬 Language Support: English, Vietnamese",
      "♿ Accessibility: Ramp Access",
    ],
    hours:[
      "Monday : 10:00 AM – 8:00 PM", 
      "Tuesday : 10:00 AM – 8:00 PM", 
      "Wednesday : 10:00 AM – 8:00 PM", 
      "Thursday : 10:00 AM – 8:00 PM", 
      "Friday : 10:00 AM – 8:00 PM",
      "Saturday : 10:00 AM – 8:00 PM",
      "Sunday : 10:00 AM – 8:00 PM"
    ],
  },
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function OvernightShelters() {
  FindShelters();
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
                <li>{selectedFacility?.hours[0]}</li>
                <li>{selectedFacility?.hours[1]}</li>
                <li>{selectedFacility?.hours[2]}</li>
                <li>{selectedFacility?.hours[3]}</li>
                <li>{selectedFacility?.hours[4]}</li>
                <li>{selectedFacility?.hours[5]}</li>
                <li>{selectedFacility?.hours[6]}</li>
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
