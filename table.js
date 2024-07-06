const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'celina',
})
connection.connect((err) => {
    if (err) {
        res.end("Cannot connect to database");
        console.error("Error connecting to MySQL", err);
        return;
    }
    console.log("Connected to mysql");
});
const query = `create database Stock_Savvy`;
async function runQueries() {
    try {
        const [result1] = await database.query('SELECT * FROM table1');
        const [result2] = await database.query('SELECT * FROM table2');
        // Process results
    } catch (error) {
        console.error('Error running queries:', error);
    }
}

connection.query(query, (err, res) => {
    if (err) {
        console.end("Could not create database");
        console.log(err);
        return;
    }
    console.log("Data inserted securely")
});
//const query = `use Stock_Savvy`;