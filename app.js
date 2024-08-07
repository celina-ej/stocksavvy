let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
let statu = document.getElementById('st');
let p_l = document.getElementById('l');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'celina',
    database: 'Stock_Savvy'
});
connection.connect((err) => {
    if (err) {
        res.end("Cannot connect to database");
        console.error("Error connecting to MySQL", err);
        return;
    }
    console.log("Connected to mysql");
});
ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    var g = localStorage.getItem("price");
    var tar = localStorage.getItem("target");
    var sl = localStorage.getItem("stoploss");
    var amt = localStorage.getItem("Amount");
    const query = `insert into papertrading (phoneno,price,target,stoploss,amount)values ('7777777777',${g},${tar},${sl},${amt})`
    connection.query(query, (err, res) => {
        if (err) {
            console.end("101 Error. Kindly contact Admin")
            console.log(err);
            return;
        }
        console.log("Data inserted securely")
    })
    var z = Math.round(stockObject.p * 100) / 100;
    if (tar == 0) {
        tar = 99999;
    }
    if (sl == 0) {
        sl = 0;
    }
    if (z == g && statu.innerText !== "__CLOSED") {
        statu.innerText = "_EXECUTED";
    } else if (z !== g && statu.innerText !== "_EXECUTED" && statu.innerText !== "__CLOSED") {
        statu.innerText = "_PENDING_";
    }
    if (statu.innerText !== "__CLOSED" && statu.innerText !== "_PENDING_") {
        var t = Math.round(((z - g) / g) * amt * 10 * 100) / 100
        localStorage.setItem("pro", t)
    }
    if (statu.innerText == "__CLOSED") {
        var d = localStorage.getItem("pro")
        localStorage.setItem("profit", d)

    }
    if (tar <= z && statu.innerText == "_EXECUTED") {
        statu.innerText = "__CLOSED";

    } else if (sl >= z && statu.innerText == "_EXECUTED") {
        statu.innerText = "__CLOSED";
    }
    if (t > 0 && statu.innerText !== "__CLOSED" && statu.innerText !== "_PENDING_") {
        p_l.innerText = '+' + t
        document.getElementById('l').style.color = "green";
    } else if (statu.innerText !== "__CLOSED" && t < 0 && statu.innerText !== "_PENDING_") {
        p_l.innerText = t
        document.getElementById('l').style.color = "red";
    }
}