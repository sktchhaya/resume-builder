const mysql=require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'booksdb',
    password: 'toor'
});

module.exports = pool.promise();