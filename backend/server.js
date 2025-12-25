const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "posts.json");

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(DATA_FILE));
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    timestamp: new Date().toISOString()
  };
  posts.unshift(newPost);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.json({ success: true });
});

app.delete("/posts/:id", (req, res) => {
  let posts = JSON.parse(fs.readFileSync(DATA_FILE));
  posts = posts.filter(p => p.id != req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
