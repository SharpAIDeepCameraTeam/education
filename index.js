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

app.get('/app', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/index.html'));
});

app.get('/student', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/loader.html'));
});

app.get('/apps', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/apps.html'));
});

app.get('/lessons', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/agloader.html'));
});

app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(process.cwd(), './static/404.html'))
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
