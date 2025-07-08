require("express-async-errors");

// express
const express = require("express");
const app = express();

// other packages
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// routes
const urlRoutes = require("./routes/url.routes");
const redirectRoutes = require("./routes/redirect.routes");

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bub API" });
});

// routes
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

// other middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;

