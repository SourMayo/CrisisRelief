import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { SearchResult } from "../config/SearchResults";
import { useNavigate } from "react-router-dom";

const categories = [
  "All Categories",
  "Weather Zones",
  "Locations",
  "Reviews",
  "Food Banks",
];

const SearchForm = () => {
  const navigate = useNavigate();

  // State declarations
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [zipQuery, setZipQuery] = useState("");
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [resultsPosition, setResultsPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Create portal container dynamically if not present
  useEffect(() => {
    let container = document.getElementById(
      "search-dropdown-portal"
    ) as HTMLDivElement;
    if (!container) {
      container = document.createElement("div");
      container.id = "search-dropdown-portal";
      document.body.appendChild(container);
    }
    setPortalContainer(container);
  }, []);

  // Click outside and Escape key handling to close dropdown/results
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !inputRef.current?.contains(target) &&
      !buttonRef.current?.contains(target) &&
      !searchResultsRef.current?.contains(target) &&
      !categoryDropdownRef.current?.contains(target)
    ) {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen || searchResults.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, searchResults.length, handleClickOutside, handleKeyDown]);

  // Positioning for category dropdown
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isDropdownOpen]);

  // Positioning for search results dropdown
  useEffect(() => {
    if (inputRef.current && searchResults.length > 0) {
      const rect = inputRef.current.getBoundingClientRect();
      setResultsPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [searchResults]);

  // Handlers
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  // Handle form submission and normalize response data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    redirectSearch();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    const toastId = toast.loading(
      `Searching for "${searchQuery}" in ${selectedCategory}...`
    );

    try {
      const response = await fetch(
        `http://crisisrelief.duckdns.org:5001/search?query=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(selectedCategory)}&zip=${encodeURIComponent(
          zipQuery
        )}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Search failed");
      }

      const data = await response.json();

      // Normalize response format
      let formattedResults: SearchResult[] = [];
      if (selectedCategory === "All Categories") {
        formattedResults = [
          ...(data.locations || []).map((item: SearchResult) => ({
            ...item,
            type: "location",
          })),
          ...(data.weatherZones || []).map((item: SearchResult) => ({
            ...item,
            type: "weather",
          })),
          ...(data.reviews || []).map((item: SearchResult) => ({
            ...item,
            type: "review",
          })),
          ...(data.foodBanks || []).map((item: SearchResult) => ({
            ...item,
            type: "food",
          })),
        ];
      } else {
        formattedResults = data.map((item: SearchResult) => ({
          ...item,
          type: selectedCategory.toLowerCase(),
        }));
      }

      setSearchResults(formattedResults);
      toast.update(toastId, {
        render: `Found ${formattedResults.length} results`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Search failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  // Category dropdown component rendered via portal
  const categoryDropdown = (
    <div
      ref={categoryDropdownRef}
      className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        {/* Accept ZIP code input */}
          <input
            ref={inputRef}
            type="text"
            id="search-zip"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
            className="block ml-2 p-2.5 w-40 z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder={`Enter ZIP Code...`}
            autoComplete="off"
          /> 

        {/* Category Buttons */}
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleCategorySelect(category)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {category}
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );

  // Search results dropdown rendered via portal with white background and dark text
  const searchResultsDropdown = (
    <div
      ref={searchResultsRef}
      className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
      style={{
        position: "absolute",
        top: resultsPosition.top,
        left: resultsPosition.left,
        width: resultsPosition.width,
        minWidth: "176px",
      }}
    >
      {searchResults.map((result) => (
        <div
          key={`${result.type}-${result.location_id || result.id}`}
          className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 border-b border-gray-200 last:border-0"
          onClick={() => setSearchResults([])}
        >
          <div className="flex justify-between items-center">
            <span>{result.name}</span>
            {result.type && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {result.type}
              </span>
            )}
          </div>
          {result.location_name && (
            <div className="text-sm text-gray-600">{result.location_name}</div>
          )}
        </div>
      ))}
      {searchResults.length === 0 && (
        <div className="px-4 py-2 text-gray-500">No results found</div>
      )}
    </div>
  );


  async function GetLat(zipcode: string) :Promise<string>{
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zipcode + '&key=AIzaSyA8kBvyVuMIntoFV4idRZXleBRXiLl6-mQ';
    const reponse = await fetch(URL)
    const data = await reponse.json();
    const coords = parseFloat(data.results[0].geometry.location.lat).toString();
    return coords;
  }
  
  async function GetLng(zipcode: string) :Promise<string>{
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zipcode + '&key=AIzaSyA8kBvyVuMIntoFV4idRZXleBRXiLl6-mQ';
    const reponse = await fetch(URL)
    const data = await reponse.json();
    const coords = parseFloat(data.results[0].geometry.location.lng).toString();
    return coords;
  }

  // // Take inputted query and redirect user to search page
  async function redirectSearch() {

    var latQuery!: string;
    var lngQuery!: string;

    await GetLat(zipQuery).then((number) => {
      latQuery = number;
    });

    await GetLng(zipQuery).then((number) => {
      lngQuery = number;
    });

    const queries = new URLSearchParams({
      search: searchQuery,
      zip: zipQuery,
      lat: latQuery,
      lang: lngQuery
    });

    if (selectedCategory == "Food Banks") {
      navigate(`/foodBanks?${queries.toString()}`);
    }
    else{
      navigate(`/search?${queries.toString()}`);
    }
  }

  return (
    <form className="max-w-xl mx-auto relative" onSubmit={handleSubmit}>
      {/* If not set globally, add <ToastContainer position="top-right" /> at your app root */}
      <div className="flex relative">
        <label htmlFor="search-dropdown" className="sr-only">
          Search
        </label>
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isDropdownOpen &&
          portalContainer &&
          createPortal(categoryDropdown, portalContainer)}
        <div className="relative w-full">
          
          {/* Regular search input */}
          <input
            ref={inputRef}
            type="search"
            id="search-dropdown"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder={`Search ${selectedCategory.toLowerCase()}...`}
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
      {searchResults.length > 0 &&
        portalContainer &&
        createPortal(searchResultsDropdown, portalContainer)}
    </form>
  );
};

export default SearchForm;
