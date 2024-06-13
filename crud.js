const sqlite3 = require('sqlite3').verbose();
const db = require('./database');

// Create 
const createItem = (date, category, duration, callback) => {
    const sql = 'INSERT INTO stats (date, category, duration) VALUES (?, ?, ?)';
    db.run(sql, [date, category, duration], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

// Read 
const readItem = (callback) => {
    const sql = 'SELECT * FROM stats';
    db.all(sql, callback);
};

// Update 
const updateItem = (id, date, category, duration, callback) => {
    const sql = 'UPDATE stats SET date = ?, category = ?, duration = ? WHERE id = ?';
    db.run(sql, [date, category, duration, id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: id });
    });
};

// Delete 
const deleteItem = (id, callback) => {
    const sql = 'DELETE FROM stats WHERE id = ?';
    db.run(sql, id, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: id });
    });
};

module.exports = { createItem, readItem, updateItem, deleteItem };