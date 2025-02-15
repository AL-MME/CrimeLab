import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { logMiddleware } from "./middlewares/log-middleware";
import { connectNeo4j } from './config/neo4j';
import { Session } from 'neo4j-driver';
import cors from "cors";
import multer from 'multer';

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
connectDB();
const upload = multer({ dest: 'uploads/' });
const driver = connectNeo4j();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(cors());

const PORT = process.env.PORT;

app.use(logMiddleware);

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

interface Node {
    id: string;
    label: string;
    properties: Record<string, any>;
}

interface Edge {
    from: string;
    to: string;
    type: string;
    properties: Record<string, any>;
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

app.get("/api/graph", async (req: Request, res: Response<GraphData | object>) => {
    const session: Session = (await driver).session();

    try {
        const result = await session.run(
            "MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 50"
        );

        const nodes: Node[] = [];
        const edges: Edge[] = [];

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
    } catch (error) {
        console.error("Error fetching graph data", error);
        res.status(500).json({ error: "Error fetching graph data" });
    }
    finally {
        await session.close();
    }
});

const routesPath = path.join(__dirname, './routes');
fs.readdirSync(routesPath).forEach((file: string) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        console.log(`✅ Route ${file} load successfully`);
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
    res.status(404).json({ error: "ressource not found", cause: "bad method or inexistant route" });
});