import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

async function FindShelters() {
  const { Place } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;

  const request = {
    textQuery: "Homeless Shelters",
    fields: [
      "id",
      "editorialSummary",
      "formattedAddress",
      "allowsDogs",
      "businessStatus",
      "displayName",
      "internationalPhoneNumber",
      "location",
      "photos",
      "priceLevel",
      "primaryTypeDisplayName",
      "rating",
      "regularOpeningHours",
      "websiteURI",
      "userRatingCount",
    ],
    language: "en-US",
    maxResultCount: 8,
    locationBias: { lat: 37.4161493, lng: -122.0812166 }, //Center on SF
    region: "us",
  };

  const { places } = await Place.searchByText(request);

  if (places.length > 0) {
    console.log(places.length);
    var offset = 10;
    places.forEach((place) => {
      var newLocation = {
        id: offset,
        name: place.displayName ?? "Name Unavaiable",
        address: place.formattedAddress ?? "Address Unavaiable",
        phone:
          place.internationalPhoneNumber ??
          place.nationalPhoneNumber ??
          "Number Unavailable",
        website: place.websiteURI ?? "Website Unavailable",
        lat: place.location?.lat()!,
        lng: place.location?.lng()!,
        description: place.editorialSummary ?? "Description Unavailable",
        quickInfo: [
          "📞 Emergency:" + place.internationalPhoneNumber,
          "🛏️ Beds Available: " + "Unknown",
          "💬 Language Support: English, Spanish",
          "⌛️ 24/7 walkins",
        ],
      };
      facilities.push(newLocation);
      offset++;
    });
  } else {
    console.log("No results");
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
  },
  {
    id: 3,
    name: "Ayeshas Hope Shelter  ",
    address: "124 2nd Street",
    phone: "(789) 654–3210",
    website: "https://www.AyeshasHopeShelter.org",
    lat: 37.7749,
    lng: -122.4194,
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
    lat: 37.7749,
    lng: -122.4194,
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
    lat: 37.7749,
    lng: -122.4194,
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

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function OvernightShelters() {
  FindShelters();
  const [selectedId, setSelectedId] = useState(facilities[0].id);
  const selectedFacility = facilities.find((f) => f.id === selectedId)!;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

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
          {/* Facility Info */}
          <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 space-y-2">
            <h1 className="text-xl font-bold">🏥 {selectedFacility?.name}</h1>
            <p className="text-gray-300">📍 {selectedFacility?.address}</p>
            <p className="text-gray-300">📞 Phone: {selectedFacility?.phone}</p>
            <p className="text-gray-300">
              📝 Description: {selectedFacility?.description}
            </p>
            <p className="text-gray-300">
              🌐 Website:{" "}
              <a
                href={selectedFacility?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400"
              >
                {selectedFacility?.website}
              </a>
            </p>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Hours Box */}
            <div className="flex-1 bg-[#1F2A40] text-white rounded-xl shadow-md p-6">
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

            {/* Map */}
            <div className="flex-1 bg-[#1F2A40] rounded-xl shadow-md p-4 h-[400px]">
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

          {/* Reviews Section */}
          <div className="w-full bg-[#1F2A40] text-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const content = form.review.value;
                const rating = form.rating.value;

                const userId = 1; // TODO: replace with real user ID from session/auth
                const locationId = selectedFacility.id;

                if (content.trim().length > 0 && rating) {
                  const res = await fetch("/api/reviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      content,
                      rating: parseInt(rating),
                      user_id: userId,
                      location_id: locationId,
                    }),
                  });

                  if (res.ok) {
                    alert("Review submitted!");
                    form.reset();
                  } else {
                    alert("Failed to submit review.");
                  }
                }
              }}
            >
              <div className="bg-white text-black rounded-lg p-4 space-y-4">
                <textarea
                  name="review"
                  className="w-full h-24 p-2 rounded border border-gray-300"
                  placeholder="Write your review here..."
                  required
                ></textarea>

                {/* Star Rating */}
                <div className="flex items-center space-x-2">
                  <span className="text-black font-semibold">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl cursor-pointer transition-colors ${
                        ((hoveredRating ?? 0) || (selectedRating ?? 0)) >= star
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => {
                        setSelectedRating(star);
                      }}
                    >
                      ★
                    </span>
                  ))}
                  {/* Hidden input to submit the selected rating */}
                  <input
                    type="hidden"
                    name="rating"
                    value={selectedRating ?? ""}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
