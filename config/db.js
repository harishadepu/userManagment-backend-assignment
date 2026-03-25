import Database from 'better-sqlite3'

const db = new Database("users.db")

db.prepare(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER
    )
    `).run();

export default db