import sqlite3 from 'sqlite3';

// Create db connection class

class Database {

  constructor() {
    (async () => {
      this.db = new sqlite3.Database('./db.sqlite');
    })();
  }

  // Open connection function
  open() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        resolve();
      });
    });
  }

  // Close connection function
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  // Create table if it doesn't exist
  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          message TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    } )
  }

  // Insert a message into the database and return the id

  async insert(message) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO messages (message) VALUES (?)
      `, [message], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      })
    })
  }

  async getAllMessages(lastID) {
    return new Promise((resolve, reject) => {
      // RESOLVE: resolve the promise with the rows
      // REJECT: reject the promise with the error
      
      this.db.all(`
        SELECT * FROM messages WHERE id > ?
      `, [lastID ?? 0], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
       })})}

}
async function test() {
  const db = new Database();
  await db.open();
  await db.createTable();
  db.insert("Hello world!");
  db.insert("Hello world!");
  db.insert("Hello world!");
  console.log(await db.insert("Hello world!"));
  console.log(await db.getAllMessages());
  await db.close();
}

export default Database;


