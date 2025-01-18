"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const log_middleware_1 = require("./middlewares/log-middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.raw());
const PORT = process.env.PORT;
app.use(log_middleware_1.logMiddleware);
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
const routesPath = path_1.default.join(__dirname, './routes');
fs_1.default.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path_1.default.join(routesPath, file));
        console.log(`✅ Route ${file} load successfully`);
        if (typeof route === 'function') {
            app.use(route);
        }
        else {
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
    res.status(404).json({ error: "ressource not found", cause: "bad method or inexistant route" });
});
