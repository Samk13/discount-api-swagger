require("dotenv").config()
const low = require("lowdb");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const discount_code_router = require("./src/routes/discount-codes");
const swaggerUI = require("swagger-ui-express");

const PORT = process.env.PORT || 4000;

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db/db.json");
const db = low(adapter);

db.defaults({ discount_codes: [] }).write();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Discount code API",
      version: "1.0.0",
      description: "Billogram discount code API code test",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/discount_code", discount_code_router);

app.get('/', (req, res) => {
  res.sendFile('./src/pages/home.html', { root: __dirname });
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
