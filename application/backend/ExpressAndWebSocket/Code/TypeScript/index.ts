//Sample Code from the tutorials. Feel free to delete
/*
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');
  
  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received your message: ${message}`);
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
*/