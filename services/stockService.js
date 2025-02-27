import mysql from 'mysql2/promise';

try {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'stockmanager',
        database: 'stockmanager',
        password: 'stockmanager',
        port: 53306
    });

    // execute will internally call prepare and query
    const [results, fields] = await connection.execute(
        'SELECT * FROM `items` WHERE `name` like ?',
        ['wood%']
    );

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
    console.log(err);
}