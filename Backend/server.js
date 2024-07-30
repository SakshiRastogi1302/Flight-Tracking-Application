const express = require("express");
const cors = require("cors");
const { sendMail } = require("./sendMail");
const mysql = require('mysql2');
const WebSocket = require('ws');
const http = require('http');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "flight_tracking_application_database"
})

// Function to check for updates in the notifications table
function checkForUpdates() {
  db.query('SELECT * FROM updated_flight_information', (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
          // Notify all WebSocket clients
          wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(results));
              }
          });
          // Clear notifications after sending
          db.query('DELETE FROM updated_flight_information', err => {
              if (err) throw err;
          });
      }
  });
}

// Poll for updates every 1 seconds
setInterval(checkForUpdates, 1000);

// WebSocket connection handling
wss.on('connection', ws => {
  ws.on('message', message => {
      console.log('Received:', message);
      // Handle incoming messages if necessary
  });
});

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

server.listen(8081, () => {
    console.log("Listening");
})

