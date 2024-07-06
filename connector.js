const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    console('req.body');
    console('res.body')
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'celina',
    database: 'Stock_Savvy'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Successfully connected to MySQL');
});