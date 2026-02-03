import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());

// Basic routes (for testing)
app.get("/ping", (req, res) => {
    res.send("pong");
})

// Serve static files
const frontendDistPath = path.join(process.cwd(), '../frontend/dist');
app.use(express.static(frontendDistPath));

// Serve Vue SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})