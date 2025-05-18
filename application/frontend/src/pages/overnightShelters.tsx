import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Define language type
type Lang = "en" | "vi";

// Translation strings for English and Vietnamese
const translations: Record<Lang, { [key: string]: string }> = {
  en: {
    title: "Overnight Shelters",
    hideFacilities: "▲ Hide Facilities",
    showFacilities: "▼ Show Facilities",
    hoursOpen: "Hours Open",
    phone: "Phone",
    description: "Description",
    website: "Website",
    loadingMap: "Loading map...",
    leaveReview: "Leave a Review",
    reviewContent: "Your review",
    submitReview: "Submit Review",
    reviews: "Reviews",
    noReviews: "No reviews yet. Be the first to leave one!",
    language: "Language",
    dayUnavailable: "Day Unavailable",
    numberUnavailable: "Number Unavailable",
    websiteUnavailable: "Website Unavailable",
    descriptionUnavailable: "Description Unavailable",
    nameUnavailable: "Name Unavaiable",
    addressUnavailable: "Address Unavaiable",
  },
  vi: {
    title: "Nơi Trú Ẩn Qua Đêm",
    hideFacilities: "▲ Ẩn Cơ Sở",
    showFacilities: "▼ Hiển Thị Cơ Sở",
    hoursOpen: "Giờ Mở Cửa",
    phone: "Điện thoại",
    description: "Mô tả",
    website: "Trang web",
    loadingMap: "Đang tải bản đồ...",
    leaveReview: "Để Lại Đánh Giá",
    reviewContent: "Đánh giá của bạn",
    submitReview: "Gửi Đánh Giá",
    reviews: "Đánh Giá",
    noReviews: "Chưa có đánh giá nào. Hãy là người đầu tiên để lại đánh giá!",
    language: "Ngôn ngữ",
    dayUnavailable: "Không có thông tin ngày",
    numberUnavailable: "Không có số điện thoại",
    websiteUnavailable: "Không có trang web",
    descriptionUnavailable: "Không có mô tả",
    nameUnavailable: "Không có tên",
    addressUnavailable: "Không có địa chỉ",
  },
};

interface Review {
  review_id: number;
  content: string;
  rating: number;
  user_id: number;
}

interface Facility {
  place_id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  lat: number;
  lng: number;
  description: string;
  hours: string[];
}

export default function OvernighShelters() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedFacility = facilities.find((f) => f.place_id === selectedId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfeXWLWeO3WA15MY8AD55aprDhvuTOKFQ",
  });

  useEffect(() => {
    async function fetchReviews() {
      if (!selectedFacility) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews?location_id=${selectedFacility.place_id}`
        );
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews.");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }

    if (selectedFacility?.place_id) {
      fetchReviews();
    }
  }, [selectedFacility]);

  useEffect(() => {
    async function FindOvernightShelters() {
      if (typeof google === "undefined" || !google.maps?.importLibrary) {
        console.warn("Google Maps API not yet loaded.");
        return;
      }

      const { Place } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;

      const request = {
        textQuery: "Homeless Shelter",
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
        language: lang === "en" ? "en-US" : "vi",
        maxResultCount: 8,
        locationBias: { lat: 37.4161493, lng: -122.0812166 }, //Center on SF
        region: "us",
      };

      const { places } = await Place.searchByText(request);

      if (places.length > 0) {
        console.log(places.length);
        const googleFacilities = places.map((place) => ({
          place_id: place.id,
          name: place.displayName ?? t.nameUnavailable,
          address: place.formattedAddress ?? t.addressUnavailable,
          phone:
            place.internationalPhoneNumber ??
            place.nationalPhoneNumber ??
            t.numberUnavailable,
          website: place.websiteURI ?? t.websiteUnavailable,
          lat: place.location?.lat() ?? 0,
          lng: place.location?.lng() ?? 0,
          description: place.editorialSummary ?? t.descriptionUnavailable,
          hours: Array.from(
            { length: 7 },
            (_, j) =>
              place.regularOpeningHours?.weekdayDescriptions?.[j] ??
              t.dayUnavailable
          ),
        }));

        setFacilities(googleFacilities);
        setSelectedId(googleFacilities[0]?.place_id ?? null);
      } else {
        console.log("No results");
      }
    }

    if (isLoaded) {
      FindOvernightShelters();
    }
  }, [isLoaded, lang, t]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB] relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-[#1F2A40] text-white py-3 text-xl font-semibold tracking-wide"
        >
          {sidebarOpen ? t.hideFacilities : t.showFacilities}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-80 bg-[#BCD3F2] rounded-lg text-white p-6 space-y-4 max-h-[95vh] overflow-y-auto mt-4 lg:mt-8 lg:static absolute z-50`}
      >
        <h2 className="text-[30px] font-bold text-black mb-4">
          {t.title}
        </h2>

        {/* Close button on mobile only */}
        <div className="lg:hidden mb-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-black bg-white rounded px-3 py-1 font-semibold hover:bg-gray-200 transition"
          >
            {t.hideFacilities}
          </button>
        </div>

        {facilities.map((f) => (
          <button
            key={f.place_id}
            onClick={() => {
              setSelectedId(f.place_id);
              setSidebarOpen(false);
            }}
            className={`w-full text-left p-4 rounded-lg font-medium transition ${
              selectedId === f.place_id
                ? "bg-[#715FFF] text-white"
                : "bg-[#1F2A40] hover:bg-[#27354F]"
            }`}
          >
            <h3 className="text-lg font-semibold">{f.name}</h3>
            <p className="text-med ">{f.address}</p>
          </button>
        ))}
        
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

      {/* Main Content */}
      <main className="flex-1 flex justify-center p-10 overflow-y-auto">
        <div className="bg-[#BCD3F2] p-8 rounded-xl border border-black shadow-lg w-full max-w-6xl space-y-6">
          {/* Facility Info */}
          <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6 space-y-2">
            <h1 className="text-xl font-bold">🏠 {selectedFacility?.name}</h1>
            <p className="text-gray-300">📍 {selectedFacility?.address}</p>
            <p className="text-gray-300">📞 {t.phone}: {selectedFacility?.phone}</p>
            <p className="text-gray-300">
              📝 {t.description}: {selectedFacility?.description}
            </p>
            <p className="text-gray-300">
              🌐 {t.website}:{" "}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hours Box */}
            <div className="bg-[#1F2A40] text-white rounded-xl shadow-md p-6">
              <h2 className="text-[20px] font-bold mb-4">{t.hoursOpen}</h2>
              <ul className="space-y-2 text-med leading-relaxed">
                {selectedFacility?.hours.map((hour: string, index: number) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div className="bg-[#1F2A40] rounded-xl shadow-md p-4 h-[300px] lg:h-[400px]">
              {isLoaded && selectedFacility ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
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
                <div className="text-white">{t.loadingMap}</div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full bg-[#1F2A40] text-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{t.leaveReview}</h2>
            <form
              onSubmit={async (e) => {
                console.log("Submitting review...");
                e.preventDefault();
                const form = e.currentTarget;
                const content = form.review.value;
                const rating = form.rating.value;

                const userId = 1; // TODO: replace with real user ID from session/auth
                if (!selectedFacility) return;
                const locationId = selectedFacility.place_id;

                if (content.trim().length > 0 && rating) {
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/reviews`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          content,
                          rating: parseInt(rating),
                          user_id: userId,
                          location_id: locationId,
                        }),
                      }
                    );

                    if (res.ok) {
                      alert("Review submitted!");
                      form.reset();
                    } else {
                      const errorMsg = await res.text();
                      console.error("Error submitting review:", errorMsg);
                      alert("Failed to submit review.");
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    alert("An error occurred while submitting the review.");
                  }
                }
              }}
            >
              <div className="bg-white text-black rounded-lg p-4 space-y-4">
                <textarea
                  name="review"
                  className="w-full h-24 p-2 rounded border border-gray-300"
                  placeholder={t.reviewContent}
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
                {t.submitReview}
              </button>
            </form>

            {/* Display Reviews */}
            <div className="mt-8 bg-[#1F2A40] text-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t.reviews}</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-300">{t.noReviews}</p>
              ) : (
                <ul className="space-y-4">
                  {reviews.map((review) => (
                    <li
                      key={review.review_id}
                      className="bg-white text-black rounded-lg p-4 shadow"
                    >
                      <div className="text-yellow-400 text-lg mb-1">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <p className="mb-1">{review.content}</p>
                      <p className="text-sm text-gray-500">
                        User #{review.user_id}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
