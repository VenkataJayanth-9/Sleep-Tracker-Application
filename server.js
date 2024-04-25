var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://Jai:jaii@cluster0.7smfuhp.mongodb.net/')
var db = mongoose.connection
db.on('error', () => console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/add", (req, res) => {
    var date_input = req.body.date_input;

    var data = {
        "Date": date_input
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
})

app.listen(5000, () => {
    console.log("Listening on port 5000")
})