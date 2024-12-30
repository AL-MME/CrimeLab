import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { logMiddleware } from "./middlewares/log-middleware";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

const PORT = process.env.PORT;

app.use(logMiddleware);

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

const routesPath = path.join(__dirname, './routes');
fs.readdirSync(routesPath).forEach((file: string) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        console.log(`Loading route ${file}`);
        if (typeof route === 'function') {
            app.use(route);
        } else {
            console.error(`Le fichier ${file} n'exporte pas une fonction middleware valide.`);
        }
    }
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});

app.use((req, res, next) => {
    console.log('Ressource not found - 404');
    res.status(404).json({error: "ressource not found", cause: "bad method or inexistant route"});
});