const sqlite = require('sqlite3').verbose();
const axios = require('axios');

let sql;


const db = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err)return console.error(err.message)
})


sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, Last_name,username,password,email)';
db.run(sql);
// db.run("DROP TABLE users")



// sql= 'INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)';
// db.run(sql,["frog","poss", "tlh303", "aldygeyer", "aintnoway@gmail.com" ], (err)=>{
//     if (err)return console.error(err.message)
// })

// sql= 'UPDATE users SET first_name = ? WHERE id = ?';
// db.run(sql, ['jake', 1], (err)=>{
//      if (err)return console.error(err.message) }  );


// sql = 'SELECT * FROM users'; db.all(sql, [], (err, rows)=>{if (err)return console.error(err.message)  ;
// rows.forEach((row) => {console.log(rows);}
// )});