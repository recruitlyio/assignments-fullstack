const express = require("express");
const router = require("./routes");
const cors = require("cors");

// import db
require("./database");
require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

// listen
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
