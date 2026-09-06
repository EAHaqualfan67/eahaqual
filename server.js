import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const server = createServer(app);

// Serve Ultraviolet frontend core scripts natively
app.use('/uv/', express.static(uvPath));

// Serve your custom static frontend assets (HTML, CSS, JS)
app.use(express.static(join(__dirname, 'public')));

// Fallback route to serve your main page for single-page routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/uv/ws')) {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});
