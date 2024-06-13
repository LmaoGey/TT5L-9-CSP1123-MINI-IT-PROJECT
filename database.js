const sqlite3 = require("sqlite3").verbose();
const dbname = "timerinformation.db";


let db = new sqlite3.Database(dbname, (err) => {
if (err){

    console.error(err.message)}
    else{
        console.log("connected to database")
        db.run("CREATE TABLE IF NOT EXISTS stats(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, category TEXT, duration INTEGER )"), (err) => {
            if (err){

                console.error(err.message)}
                else {
                    console.log("table already opened or exists")
                }
        }

    }
})

module.exports = db