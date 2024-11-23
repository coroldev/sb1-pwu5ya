import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config';
import { initializeDatabase } from './schema';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.join(process.cwd(), config.dbPath);

// Enable Promise-based queries and proper typing
const db = new sqlite3.Database(dbPath);

// Add type support for get method
declare module 'sqlite3' {
  interface Database {
    get<T = any>(sql: string, params: any[], callback: (err: Error | null, row: T) => void): void;
    get<T = any>(sql: string, callback: (err: Error | null, row: T) => void): void;
  }
}

// Enable foreign key support
db.run('PRAGMA foreign_keys = ON');

// Initialize database schema
initializeDatabase(db).then(() => {
  console.log('Database schema initialized');
}).catch(err => {
  console.error('Error initializing database schema:', err);
});

export default db;