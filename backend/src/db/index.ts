import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const DB_PATH = './data/sqlite.db';


mkdirSync(dirname(DB_PATH), { recursive: true });

const sqlite = new Database(DB_PATH);

// Enable WAL mode for better concurrent performance
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

export { schema };