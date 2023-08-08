// app.js

const express = require("express");
const promBundle = require('express-prom-bundle');
const promClient = require('prom-client');
const bodyParser = require("body-parser");
const { Summary, Counter, register } = require("prom-client");
const KeyValueStore = require("./store");

const app = express();
const store = new KeyValueStore();

const registry = new promClient.Registry();

promClient.collectDefaultMetrics({ register: registry });

// Middleware to instrument HTTP requests
const metricsMiddleware = promBundle({ includeMethod: true, promClient: registry });
app.use(metricsMiddleware)

const REQUEST_LATENCY = new Summary({
  name: "request_latency_seconds",
  help: "Request latency in seconds",
});
const REQUEST_COUNT = new Counter({
  name: "request_count",
  help: "Total number of requests",
  labelNames: ["method", "endpoint"],
});
const KEYS_COUNT = new Counter({
  name: "keys_count",
  help: "Total number of keys in the DB",
});

app.use(bodyParser.json());

app.get("/get/:key", (req, res) => {
  const { key } = req.params;
  const value = store.get(key);
  if (!value) {
    return res.status(404).json({ message: "Key not found" });
  }
  return res.status(200).json({ value });
});

app.post("/set", (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ message: "Invalid data" });
  }
  store.set(key, value);
  return res.status(200).json({ message: "Key-value pair set successfully" });
});

app.get("/search", (req, res) => {
  const { prefix, suffix } = req.query;
  const keys = store.search(prefix, suffix);
  return res.status(200).json({ keys });
});

app.get("/metrics", (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(register.metrics());
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
