import express from "express";
import cors from "cors";
import path from "path";
import {apiContract} from "shared";
import { createExpressEndpoints } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import swaggerUi from "swagger-ui-express"
import { apiRouter } from "./routes/api.routes.js";

const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());

// Attach all routers
createExpressEndpoints(apiContract, apiRouter, app);
// ... auth, etc.

// Serve static files
const frontendDistPath = path.join(process.cwd(), '../frontend/dist');
app.use(express.static(frontendDistPath));

// Serve Swagger UI
const openApiDocument = generateOpenApi(apiContract, {
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