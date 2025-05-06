import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Array with default data
var defaultFacilities = [
  {
    id: 1,
    name: "Karla's Family Help",
    address: "124 Main Street",
    phone: "(123) 456–7890",
    website: "https://www.karlasfamilyhelp.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Karla’s Family Help offers weekly grocery pickups, nutritional programs for families, and emergency food assistance for those in need.",
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
    name: "Kyle's Family Food Help",
    address: "562 Oak Ave",
    phone: "(555) 321–1234",
    website: "https://www.kylesfood.org",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "Kyle's Family Food Help focuses on child-friendly meals and nutritional boxes for low-income households, with weekend pickup hours.",
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

export default function FoodBanks() {
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [selectedId, setSelectedId] = useState(defaultFacilities[0].id);
  const selectedFacility = facilities.find((f) => f.id === selectedId)!;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfeXWLWeO3WA15MY8AD55aprDhvuTOKFQ", 
  });

  useEffect(() => {
    async function FindFoodBanks() {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      
      const request = {
        textQuery: 'Food Bank',
        fields: [
          'id', 
          'editorialSummary', 
          'formattedAddress', 
          'allowsDogs', 
          'businessStatus', 
          'displayName', 
          'internationalPhoneNumber', 
          'location', 
          'photos', 
          'priceLevel', 
          'primaryTypeDisplayName', 
          'rating', 
          'regularOpeningHours', 
          'websiteURI', 
          'userRatingCount'
        ],
        language: 'en-US',
        maxResultCount: 8,
        locationBias: { lat: 37.4161493, lng: -122.0812166 }, //Center on SF
        region: 'us',
      };
  
      const { places } = await Place.searchByText(request);

      if (places.length > 0) {
        console.log(places.length);
        const googleFacilities = places.map((place, i) => ({
          id: i + 1,
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
        }));

        setFacilities(googleFacilities);
        setSelectedId(googleFacilities[0]?.id ?? null);

      } else {
        console.log('No results');
      }
    }
    
    FindFoodBanks();
  }, [isLoaded]);
  
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
            {/* <span className="text-med text-indigo-300">{f.type}</span> */}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          {/* Facility Info */}
          <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 space-y-2">
            <h1 className="text-xl font-bold">🍜 {selectedFacility?.name}</h1>
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
                <li>{selectedFacility?.hours[0]}</li>
                <li>{selectedFacility?.hours[1]}</li>
                <li>{selectedFacility?.hours[2]}</li>
                <li>{selectedFacility?.hours[3]}</li>
                <li>{selectedFacility?.hours[4]}</li>
                <li>{selectedFacility?.hours[5]}</li>
                <li>{selectedFacility?.hours[6]}</li>
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
