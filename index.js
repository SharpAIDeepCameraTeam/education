import express from "express";
import http from "node:http";
import path from "node:path";
import createBareServer from "@tomphttp/bare-server-node";

const __dirname = process.cwd();
const app = express();
const httpServer = http.createServer(app);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// Route handlers
app.get('/app', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/index.html'));
});

app.get('/student', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/loader.html'));
});

app.get('/lessons', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/agloader.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'login.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Handle Eaglercraft files
app.get('/silicon-eaglercraft-launcher-main/*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).redirect('/');
    }
  });
});

// Catch-all route - must be last
app.get('*', (req, res) => {
  if (!res.headersSent) {
    res.redirect('/');
  }
});

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const port = 8000;
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
