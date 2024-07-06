const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const fs = require('fs');
const app = new express();
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'celina',
    database: 'Stock_Savvy'
})
connection.connect((err) => {
    if (err) {
        res.end("Cannot connect to database");
        console.error("Error connecting to MySQL", err);
        return;
    }
    console.log("Connected to mysql");
});
app.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
/*connection.query('select * from user', (err, res) => {
    if (err) {
        console.log('cannot show values');
        return;
    }
    console.log()
        //const user_val = res.map(row => row.Values_in_stock_savvy);
    console.log(res);
})*/
console.log("Lets get started");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log(req.method);
    if (req.method === 'GET') {
        fs.readFile('register.html', (err, data) => {
            res.end(data);
        });
    }
});

app.post('/', (req, res) => {
    console.log("Got into post ?");
    console.log('Processing POST request');
    const query = `insert into user (username,password,account,phoneno)values (?,?,?,?)`;
    const values = [req.body.username, req.body.password, req.body.account, req.body.phoneno]
    connection.query(query, values, (err, res) => {
            if (err) {
                console.log(err);
                res.end("101 Error. Kindly contact Admin")
                return;
            }
            console.log("Data inserted securely")
        })
        /*fs.readFile('login.html', (err, data) => {
            res.end(data);
        });*/
    res.redirect('/login')
});
app.get('/login', (req, res) => {
    console.log("Got into get?");
    fs.readFile('login.html', (err, data) => {
        res.end(data);
    })
});
app.post('/login', (req, respond) => {
    console.log("reached post")
    console.log(req.body);
    const phone = req.body.phone;
    const password = req.body.password;
    console.log("Entered phone:", phone);
    console.log("Entered password:", password);
    const query = `select username,password from user where phoneno like '${phone}'`;
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Incorrect password or username')
            return;
        }
        console.log('Search Results\n', res);
        req.session.username = res[0].username;
        req.session.phoneno = req.body.phone;
        console.log(res[0].password);
        if (res[0].password == password) {
            fs.readFile('index.html', (err, data) => {
                respond.end(data);
            })
            return;
        } else {
            respond.end('Incorrect Password!Please Try again')
        }

    });
});
app.use((req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.phoneno = req.session.phoneno;
    next();
});
app.get("/exit_l.html", (req, res) => {
    console.log("long get");
    fs.readFile('exit_l.html', (err, data) => {
        res.end(data)
    })
});
app.get("/exit_s.html", (req, res) => {
    console.log("short get");
    fs.readFile('exit_s.html', (err, data) => {
        res.end(data)
    })
});
app.get("/index.html", (req, res) => {
    console.log("reaching index");
    fs.readFile('index.html', (err, data) => {
        res.end(data)
    })
});
app.post("/exit_l.html", (req, respond) => {
    console.log('long post')
    console.log(req.body);
    fs.readFile('exit_l.html', (err, data) => {
        respond.end(data);
    });
});
app.post("/exit_s.html", (req, respond) => {
    console.log('short');
    console.log(req.body);
    fs.readFile('exit_s.html', (err, data) => {
        respond.end(data);
    });
});
app.post('/papertrading.html', (req, respond) => {
    console.log("reading data entered");
    console.log(req.body);
});
//reading the modules individually
app.get('/course.html', (req, res) => {
    console.log(req.session.phoneno)
    const query = `INSERT IGNORE INTO courses(phoneno) VALUES('${req.session.phoneno}')`;

    connection.query(query, (err, res) => {
        if (err) {
            console.log(err);
            res.end("101 Error. Kindly contact Admin")
            return;
        }
        console.log("Data inserted securely")
    })
    const query1 = `insert ignore into papertrading(phoneno) values (${req.session.phoneno})`
    connection.query(query1, (err, res) => {
        if (err) {
            console.log(err);
            res.end("101 Error. Kindly contact Admin")
            return;
        }
        console.log("Data inserted securely")
    })
    console.log(req.session.username);
    console.log("Getting course");
    fs.readFile('course.html', (err, data) => {
        res.end(data);
    })
});
app.get('/features.html', (req, res) => {
    console.log("Getting paper trading");
    fs.readFile('features.html', (err, data) => {
        res.end(data);
    })
});
app.get('/papertrading.html', (req, res) => {
    console.log("Getting paper trading");
    fs.readFile('papertrading.html', (err, data) => {
        res.end(data);
    })
});
app.get('/contact.html', (req, res) => {
    console.log("Getting paper trading");
    fs.readFile('papertrading.html', (err, data) => {
        res.end(data);
    })
});
app.get('/about.html', (req, res) => {
    console.log("Getting paper trading");
    fs.readFile('about.html', (err, data) => {
        res.end(data);
    })
});
app.get('/Mod1.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('Mod1.html', (err, data) => {
        res.end(data);
    });
});
app.get('/Mod2.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('Mod2.html', (err, data) => {
        res.end(data);
    });
});
app.get('/Mod3.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('Mod3.html', (err, data) => {
        res.end(data);
    });
});
app.get('/Mod4.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('Mod4.html', (err, data) => {
        res.end(data);
    });
});
app.get('/Mod5.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('Mod5.html', (err, data) => {
        res.end(data);
    });
});
app.get('/quiz1.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('quiz1.html', (err, data) => {
        res.end(data);
    });
});
app.get('/quiz2.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('quiz1.html', (err, data) => {
        res.end(data);
    });
});
app.get('/quiz3.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('quiz1.html', (err, data) => {
        res.end(data);
    });
});
app.get('/quiz4.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('quiz1.html', (err, data) => {
        res.end(data);
    });
});
app.get('/quiz5.html', (req, res) => {
    console.log("Getting course");
    fs.readFile('quiz1.html', (err, data) => {
        res.end(data);
    });
});
app.post('/quiz1.html', (req, respond) => {
    console.log("trying quiz");
    console.log(req.body)
    const answers2 = {
        question1: 'a',
        question2: 'c',
        question3: 'b',
        question4: 'c',
        question5: 'd',
        question6: 'd',
        question7: 'b',
        question8: 'a',
        question9: 'a',
        question10: 'a'
    };
    let mylist = [];
    let sum = 0;
    for (const question in req.body) {
        if (req.body[question] === answers2[question]) {
            sum++;
        }
    }
    query = `UPDATE courses SET course1 = ${sum} WHERE phoneno = ${req.session.phoneno};`
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Please Contact administrator')
            return;
        } else {
            console.log("data inserted");
            respond.redirect('./Mod2.html')
        }
    });
});
app.post('/quiz2.html', (req, respond) => {
    console.log("trying quiz2");
    console.log(req.body)
    const answers2 = {
        question1: 'a',
        question2: 'c',
        question3: 'b',
        question4: 'c',
        question5: 'd',
        question6: 'd',
        question7: 'b',
        question8: 'a',
        question9: 'a',
        question10: 'a'
    };
    let mylist = [];
    let sum = 0;
    for (const question in req.body) {
        if (req.body[question] === answers2[question]) {
            sum++;
        }
    }
    query = `UPDATE courses SET course2 = ${sum} WHERE phoneno = ${req.session.phoneno};`
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Please Contact administrator')
            return;
        } else {
            console.log("data inserted");
            respond.redirect('./Mod3.html')
        }
    });
});
app.post('/quiz3.html', (req, respond) => {
    console.log("trying quiz3");
    console.log(req.body)
    const answers2 = {
        question1: 'a',
        question2: 'c',
        question3: 'b',
        question4: 'c',
        question5: 'd',
        question6: 'd',
        question7: 'b',
        question8: 'a',
        question9: 'a',
        question10: 'a'
    };
    let mylist = [];
    let sum = 0;
    for (const question in req.body) {
        if (req.body[question] === answers2[question]) {
            sum++;
        }
    }
    query = `UPDATE courses SET course3 = ${sum} WHERE phoneno = ${req.session.phoneno};`
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Please Contact administrator')
            return;
        } else {
            console.log("data inserted");
            respond.redirect('./Mod4.html')
        }
    });
});
app.post('/quiz4.html', (req, respond) => {
    console.log("trying quiz 4");
    console.log(req.body)
    const answers2 = {
        question1: 'a',
        question2: 'c',
        question3: 'b',
        question4: 'c',
        question5: 'd',
        question6: 'd',
        question7: 'b',
        question8: 'a',
        question9: 'a',
        question10: 'a'
    };
    let mylist = [];
    let sum = 0;
    for (const question in req.body) {
        if (req.body[question] === answers2[question]) {
            sum++;
        }
    }
    query = `UPDATE courses SET course4 = ${sum} WHERE phoneno = ${req.session.phoneno};`
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Please Contact administrator')
            return;
        } else {
            console.log("data inserted");
            respond.redirect('./Mod5.html')
        }
    });
});
app.post('/quiz5.html', (req, respond) => {
    console.log("trying quiz");
    console.log(req.body)
    const answers2 = {
        question1: 'a',
        question2: 'c',
        question3: 'b',
        question4: 'c',
        question5: 'd',
        question6: 'd',
        question7: 'b',
        question8: 'a',
        question9: 'a',
        question10: 'a'
    };
    let mylist = [];
    let sum = 0;
    for (const question in req.body) {
        if (req.body[question] === answers2[question]) {
            sum++;
        }
    }
    query = `UPDATE courses SET course1 = ${sum} WHERE phoneno = ${req.session.phoneno};`
    connection.query(query, (err, res) => {
        if (err) {
            console.log("ERROR:\n", err);
            respond.send('Please Contact administrator')
            return;
        } else {
            console.log("data inserted");
            respond.redirect('./pt.html')
        }
    });
});
//Starting with paper trading
app.get('/pt.html', (err, res) => {
    fs.readFile('pt.html', (err, data) => {
        res.end(data);
    });
});
// myFunction.js
app.listen(8000, () => console.log('Listening on port 8000'));