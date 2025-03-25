import { UUID } from "crypto";
import { db } from "./db";   
import { sql } from "kysely";

// Show everything stored in database
export async function showAll() {
    return await db
    .selectFrom('resources')
    .selectAll()
    .execute();
}

// Search by specified UUID
export async function findLocationByUuid(id: UUID) {
  return await db
    .selectFrom('resources')
    .where('resourceId', '=', id)
    .selectAll()
    .executeTakeFirst();
}

// First search
export async function simpleSearch(userInput: string) {

    return await db
        .selectFrom('resources')
        .selectAll()
        .where(sql<boolean>`to_tsvector(name) @@ to_tsquery(${userInput})`)
        .execute();

}

/* 

-- If testing locally, run these in DataGrip to create my an example table:


CREATE TYPE resourceTypes as ENUM ('Shelter', 'FoodBank', 'MedicalCenter', 'MentalHealthSupport', 'SupplyStation');
CREATE TYPE resourceStatuses as ENUM('Open', 'Full', 'Closed', 'Unknown');

CREATE TABLE resources (
    resource_id UUID,
    name VARCHAR(50),
    type resourceTypes,
    address VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR (25),
    zip_code VARCHAR(10),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    open_hours VARCHAR(100),
    status resourceStatuses
);

INSERT INTO resources (name, type, address, city, state, zip_code, latitude, longitude, open_hours, status)
    VALUES
    ('Food Place', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Eat Place', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Yum Place', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Delicacy', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Delicacy Stop', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Help I Need Food', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Help Food', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Help Full', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('City Eats', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('End Hunger', 'FoodBank', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Safety Place', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Bed Place', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Safe Haven', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Calming Retreat', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Help I Need a Temporary Place to Live', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Rest Stop', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Campfire', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Mindful', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('Open Arms', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open'),
  ('City Place', 'Shelter', '123 Example Ave.', 'City', 'State', '99999', 1, 2, '24/7', 'Open');

*/