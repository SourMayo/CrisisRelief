import { db } from "../db"

export const search = {
    // Return everything from specified table
    async showAllLocation() {
        return db.select('*').from('locations');
    },

    async showALLWeatherZones() {
        return db.select('*').from('weather_zones');
    },

    async showAllReviews() {
        return db.select('*').from('reviews');
    },
    
    async showAllFoodBanks() {
        return db.select('*').from('food_banks');
    },


    // Simple searches by user inputted names
    async simpleLocations(userInput: string) {
        db
            .select('*')
            .from('locations')
            // Using raw in knex uses '?' to fill in values
            .whereRaw(`to_tsvector(name) @@ to_tsquery(?)`, [userInput]);
    },

    async simpleWeatherZones(userInput: string) {
        db
            .select('*')
            .from('weather_zones')
            .whereRaw(`to_tsvector(name) @@ to_tsquery(?)`, [userInput]);
    },

    async simpleReviews(userInput: string) {
        db
            .select('*')
            .from('reviews')
            .whereRaw(`to_tsvector(name) @@ to_tsquery(?)`, [userInput]);
    },

    async simpleFoodBanks(userInput: string) {
        db
            .select('*')
            .from('food_banks')
            .whereRaw(`to_tsvector(name) @@ to_tsquery(?)`, [userInput]);
    }
}

export default search