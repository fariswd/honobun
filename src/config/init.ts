import { Database } from "bun:sqlite";

const dbPath = process.env["SQLLITE3_PATH"] + "products.db";
const db = new Database(dbPath, { create: true });
db.run("CREATE TABLE products(id TEXT, name TEXT)");
