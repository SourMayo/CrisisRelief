import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { SearchResult } from "../config/SearchResults";
import { useTheme } from "../context/ThemeContext";

const categories = [
  "All Categories",
  "Weather Zones",
  "Locations",
  "Reviews",
  "Food Banks",
];

const SearchForm = () => {
  const { isColorBlindMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isDropdownOpen]);

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

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    const toastId = toast.loading(
      `Searching for "${searchQuery}" in ${selectedCategory}...`
    );
    try {
      const response = await fetch(
        `http://localhost:5001/search?query=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(selectedCategory)}`
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
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
      setSearchResults([]);
    }
  };

  const categoryDropdown = (
    <div
      ref={categoryDropdownRef}
      className="z-[1000] divide-y divide-gray-100 rounded-lg shadow-sm w-44"
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        backgroundColor: isColorBlindMode ? "#fffccf" : "white",
      }}
    >
      <ul
        className="py-2 text-sm"
        style={{ color: isColorBlindMode ? "#002244" : undefined }}
      >
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`w-full px-4 py-2 text-left ${
                isColorBlindMode
                  ? "hover:bg-blue-100 text-[#0a224e]"
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const searchResultsDropdown = (
    <div
      ref={searchResultsRef}
      className="z-[1000] divide-y divide-gray-100 rounded-lg shadow-sm"
      style={{
        position: "absolute",
        top: resultsPosition.top,
        left: resultsPosition.left,
        width: resultsPosition.width,
        backgroundColor: isColorBlindMode ? "#fffccf" : "white",
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

  return (
    <form className="max-w-xl mx-auto relative" onSubmit={handleSubmit}>
      <div className="flex relative">
        <label htmlFor="search-dropdown" className="sr-only">
          Search
        </label>
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium border rounded-s-lg"
          style={{
            backgroundColor: isColorBlindMode ? "#fffccf" : "#f3f4f6",
            color: isColorBlindMode ? "#002244" : "#111827",
            borderColor: isColorBlindMode ? "#0022cc" : "#d1d5db",
          }}
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
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
          <input
            ref={inputRef}
            type="search"
            id="search-dropdown"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm rounded-e-lg border focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Search ${selectedCategory.toLowerCase()}...`}
            style={{
              backgroundColor: isColorBlindMode ? "#fffdd0" : "#f9fafb",
              color: isColorBlindMode ? "#002244" : "#111827",
              borderColor: isColorBlindMode ? "#0022cc" : "#d1d5db",
            }}
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white border rounded-e-lg focus:ring-4"
            style={{
              backgroundColor: isColorBlindMode ? "#0022cc" : "#1d4ed8",
              borderColor: isColorBlindMode ? "#0022cc" : "#1d4ed8",
            }}
          >
            <svg
              className="w-4 h-4"
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
