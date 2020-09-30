const mysql=require('mysql2');

// pool to connect to the database.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'booksdb',
    password: 'toor'
});

// Export 
module.exports = pool.promise();
