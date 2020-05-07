var express= require ("express")
var cors = require ("cors")
var bodyParser = require ("body-parser")
var app = express()
var port = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false })) 

var Auth= require('./routes/Auth')
var Ticket= require('./routes/Ticket')
var User= require('./routes/User')
app.use('/api/auth', Auth)
app.use('/api', Ticket)
app.use('/api', User)

app.listen(port, function(){
    console.log("Server is running on port: "+port)
})