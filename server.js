import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const server = createServer(app);

// Serves your frontend site design from a folder named public
app.use(express.static(join(__dirname, 'public')));

// Automatically serves Ultraviolet engine code
app.use('/uv/', express.static(uvPath));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
