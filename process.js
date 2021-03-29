const express = require("express");

const mongodbClient = require("./mongodb");
const articleRoutes = require("./routes/articleRoutes");
const authorRoutes = require("./routes/authorRoutes");

const app = express();

app.use(express.json({ type: "application/json" }));

app.use("/articles", articleRoutes);

app.use("/authors", authorRoutes);

app.use("/", (req, res) => { res.status(404).json({ message: "Not found" })});

mongodbClient.client
  .connect()
  .then((data) =>
    app.listen(3000, () => {
      console.log("andanding");
    })
  )
  .catch((err) => console.log(err));

