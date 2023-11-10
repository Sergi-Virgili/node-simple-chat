import express from "express";
import logger from "morgan";

const port = process.env.PORT ?? 3000;

const app = new express();
app.use(logger("dev"));
app.use(express.static('client'));


app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});