import express, { Request, Response } from "express";
import dotenv from "dotenv";
const fs                = require("fs");
const path              = require('path');
const routesPath        = path.join(__dirname, './routes');
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

fs.readdirSync(routesPath).forEach((file: string) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use(route);
    }
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});

app.use((req, res, next) => {
    res.status(404).json({error: "ressource not found", cause: "bad method or inexistant route"});
});