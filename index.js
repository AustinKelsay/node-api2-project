const express = require("express");
const server = express()

const postsRouter = require("./posts/posts-router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});