const sqlite = require('sqlite3').verbose();


function submitForm() {
       var getData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
}

let sql;





const db = new sqlite.Database('users.db', sqlite.OPEN_READWRITE, (err)=>{
    if (err)return console.error(err)
})



    
     sql = 'INSERT INTO users(Username, email, password) VALUES (?,?,?)';
    db.run(sql, [getData.username, getData.email, getData.password], (err) => {
        if (err) return console.error(err)});
        console.log("Data inserted successfully!");

    //      sql = 'INSERT INTO users(Username, email, password) VALUES (?,?,?)';
    // db.run(sql, ["jake", "aladin@gmail.com", "password"], (err) => {
    //     if (err) return console.error(err)});
    //     console.log("Data inserted successfully!");
        
        
    
    //    sql = 'CREATE TABLE users(ID INTEGER PRIMARY KEY, Username, email, password)';
    //    db.run(sql);
       
       // db.run("DROP TABLE users")
   
   //USERNAME, EMAIL, PASSWORD 
    
    // sql= 'UPDATE users SET first_name = ? WHERE id = ?';
    // db.run(sql, ['jake', 1], (err)=>{
        //      if (err)return console.error(err.message) }  );


// sql = 'SELECT * FROM users'; db.all(sql, [], (err, rows)=>{if (err)return console.error(err.message)  ;
// rows.forEach((row) => {console.log(rows);}
// )});