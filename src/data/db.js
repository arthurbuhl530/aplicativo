import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('jogos.db');

export function initDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS jogos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      espaco TEXT NOT NULL
    );
  `);

}

export { db };