const express = require("express");
const cors = require("cors");
const { sendMail } = require("./sendMail");
const mysql = require('mysql');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080});



const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "flight_tracking_application_database"
})

// Function to broadcast updates to all connected WebSocket clients
const broadcast = (message) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
};

setInterval(() => {
    db.query('SELECT * FROM updated_flight_information', (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        console.log("HELLOO",JSON.stringify(results[0]));
        broadcast(JSON.stringify(results[0]));
      }
    });
  }, 30000); // Poll every second


app.get('/', (req, res) => {
    return res.json("From Backend Side");
})

app.get('/flight', (req, res) => {
    const { param1, param2, param3, param4 } = req.query;
    const sql = `SELECT * FROM flight WHERE flight_id = ? AND scheduled_departure LIKE ? AND from_location = ? AND to_location = ?`;
    const values = [param1, `${param2}%`, param3, param4];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/sendEmail', (req, res) => {
    sendMail(req.body.email, req.body.subject, req.body.text);
    res.send({ status: 200 });

});

app.listen(8081, () => {
    console.log("Listening");
})

