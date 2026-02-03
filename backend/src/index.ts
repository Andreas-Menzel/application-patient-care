import express from "express";
import cors from "cors";
import path from "path";
import {patientContract, PatientResponse} from "@my-app/shared";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import swaggerUi from "swagger-ui-express"
import { patientRouter } from "./routes/patient.routes.js";

const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());

// Basic routes (for testing)
app.get("/ping", (req, res) => {
    res.send("pong");
})

// Attach all routers
createExpressEndpoints(patientContract, patientRouter, app);
// ... auth, etc.

// Serve static files
const frontendDistPath = path.join(process.cwd(), '../frontend/dist');
app.use(express.static(frontendDistPath));

// Serve Swagger UI
// TODO: wrap patientContract in apiContract
const openApiDocument = generateOpenApi(patientContract, {
    info: {
        title: 'Patient Care API',
        version: '1.0.0',
    },
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Serve Vue SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})