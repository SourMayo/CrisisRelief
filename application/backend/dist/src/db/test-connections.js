"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../Database/knexfile"));
const db = (0, knex_1.default)(knexfile_1.default.development);
async function test() {
    try {
        await db.raw("SELECT 1");
        console.log("Connection successful!");
    }
    catch (error) {
        console.error(" Connection failed:", error);
    }
    finally {
        await db.destroy();
    }
}
test();
