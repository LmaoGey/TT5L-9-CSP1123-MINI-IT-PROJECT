const sqlite = require('sqlite3').verbose();


let sql;


const db = new sqlite.Database('users.db', sqlite.OPEN_READWRITE, (err)=>{
    if (err)return console.error(err.message)
})

    async function getData(url){
    try{



    }catch (error){console.log(err)



    }



    }
    getData('users.db')
    // sql = 'CREATE TABLE users(ID INTEGER PRIMARY KEY, Username, email, password)';
    // db.run(sql);
    
    // db.run("DROP TABLE users")

//USERNAME, EMAIL, PASSWORD 

// sql= 'INSERT INTO users(Username, email, password) VALUES (?,?,?)';
// db.run(sql,["fred", "fred@gmail.com", "geehhehet" ], (err)=>{
//     if (err)return console.error(err.message)
// })

// sql= 'UPDATE users SET first_name = ? WHERE id = ?';
// db.run(sql, ['jake', 1], (err)=>{
//      if (err)return console.error(err.message) }  );


// sql = 'SELECT * FROM users'; db.all(sql, [], (err, rows)=>{if (err)return console.error(err.message)  ;
// rows.forEach((row) => {console.log(rows);}
// )});