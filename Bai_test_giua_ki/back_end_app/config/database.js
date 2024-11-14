const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',  
    password: '123456789', 
    database: 'todolist_app' 
});
 
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
