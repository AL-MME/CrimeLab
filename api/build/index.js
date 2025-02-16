"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const neo4j_1 = require("./config/neo4j");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
(0, db_1.connectDB)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const driver = (0, neo4j_1.connectNeo4j)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.raw());
app.use((0, cors_1.default)());
const PORT = process.env.PORT;
app.use(log_middleware_1.logMiddleware);
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.get("/api/graph", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = (yield driver).session();
    try {
        const result = yield session.run("MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 50");
        const nodes = [];
        const edges = [];
        // Construction des noeuds et des relations
        result.records.forEach((record) => {
            const source = record.get("n");
            const target = record.get("m");
            const relation = record.get("r");
            // Ajouter les noeuds
            nodes.push({
                id: source.identity.toString(),
                label: source.labels[0],
                properties: source.properties,
            });
            nodes.push({
                id: target.identity.toString(),
                label: target.labels[0],
                properties: target.properties,
            });
            // Ajouter la relation
            edges.push({
                from: source.identity.toString(),
                to: target.identity.toString(),
                type: relation.type,
                properties: relation.properties,
            });
        });
        // Répond avec les données typées
        res.json({ nodes, edges });
    }
    catch (error) {
        console.error("Error fetching graph data", error);
        res.status(500).json({ error: "Error fetching graph data" });
    }
    finally {
        yield session.close();
    }
}));
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
