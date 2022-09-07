const mongoose = require("mongoose")
const express = require("express");
const app = express();
const server = require('http').Server(app)
const cors = require('cors');
const userRoute = require("./routes/info");
var request = require('request');
app.use(cors());




//const http = require('http');
//const server = http.createServer(app);
const { Server } = require("socket.io");


const io = require('socket.io')(server, {
    cors:{
        origins:['http://localhost:4200']
    }
  });


  
app.use(express.json());
app.use("/api", userRoute);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(4000, () => console.log("Server listening to", 4000));
//mongoDB conection
mongoose
    .connect("mongodb+srv://cedillo:cedillo@cluster0.2rleaov.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log ("Conectado a base de datos"))
    .catch((error) => console.log(error))

//const server = http.createServer(app)

//io = new Server(server);
var sendData
var sockettt
io.on('connection', (socket) => {
    




    //********************************* */
    sockettt = socket
    socket.on('iot/sensors', (dato) =>{
        console.log(dato);
        sendData = dato;
        sendDataa();
        //********************* */
        request.post(
            'http://localhost:4000/api/info',
            { json: { sensor:"TEMP",value:dato.data[0].value ,date:new Date().toLocaleString()} },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
        request.post(
            'http://localhost:4000/api/info',
            { json: { sensor:"HUM",value:dato.data[1].value ,date:new Date().toLocaleString()} },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    })


    
       
            
    console.log ('Conectado al server');
});

function sendDataa(){
    sockettt.emit('iot/sensores',sendData);
    
}

server.listen(3000, () => {
    console.log('listening on *:3000');
  });


