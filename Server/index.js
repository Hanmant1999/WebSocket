const WebSocket = require("ws");
const express = require("express");

const path = require("path");
const app = new express();
const server = app.listen(8000);
const wss = new WebSocket.Server({server:server});
app.use("/",express.static(path.join(__dirname,"../Client/")));
const clients = [];
wss.on("connection",(ws,req)=>{
    if(!clients.find((client)=> client === ws )){
        console.log("client added ");
        clients.push(ws);
    }
    ws.send("Hello");
    ws.on("message",(data)=>{
        console.log((String.fromCharCode(...(JSON.parse(JSON.stringify(data)).data))));
         ws.send("Hello from server");
    });

});

