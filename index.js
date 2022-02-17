const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const dbo = require("./db.config");
const synonymsRouter = require("./routes/synonyms.route");

dbo.connectToDatabase();

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

/* Routes */
app.use("/synonyms", synonymsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (process.env.LOG_LEVEL === "debug") {
    console.error(err.message, err.stack);
  }
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Synonyms app listening on port ${port}`);
});
