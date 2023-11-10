import express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = new express();
const server = createServer(app);
const io = new Server(server);

app.use(logger("dev"));
app.use(express.static('client'));

io.on("connection", (socket) => {
  console.log("a user connected");
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  })

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  })

})


app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
})

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});