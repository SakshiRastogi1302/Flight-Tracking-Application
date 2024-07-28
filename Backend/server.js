const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { sendMail } = require("./sendMail");


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"flight_information"
})

app.get('/', (req,res) => {
    return res.json("From Backend Side");
})

app.get('/flight', (req, res) => {
    const sql = "SELECT * FROM flight";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/sendEmail',(req,res) => {
    sendMail(req.body.email, req.body.subject, req.body.text);
    res.send({status:200});

});

app.listen(8081,()=>{
    console.log("Listening");
})

