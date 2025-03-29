// src/types/search.ts
export interface BaseResult {
  type: "location" | "weather" | "review" | "food";
  name: string;
}

export interface LocationResult extends BaseResult {
  type: "location";
  location_id: number;
  address: string;
  description?: string;
  photos?: string[];
  is_high_risk: boolean;
  is_safe_zone: boolean;
}

export interface WeatherResult extends BaseResult {
  type: "weather";
  weather_zone_id: number;
  location_id: number;
  weather_info: {
    temperature: string;
    condition: string;
    [key: string]: string;
  };
  last_updated: Date;
}

export interface FoodResult extends BaseResult {
  type: "food";
  food_bank_id: number;
  location_id: number;
  max_capacity: number;
  current_capacity: number;
  inventory: {
    items: string[];
    [key: string]: string[];
  };
  shortage: boolean;
}

export interface ReviewResult extends BaseResult {
  type: "review";
  review_id: number;
  location_id: number;
  user_id: number;
  content: string;
  created_at: Date;
}

export type SearchResult =
  | LocationResult
  | WeatherResult
  | FoodResult
  | ReviewResult;
