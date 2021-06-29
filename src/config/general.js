
const maxCopies = 4
const strMinLength = 4

const swaggerOptions = {
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


module.exports = {
  maxCopies,
  strMinLength,
  swaggerOptions
}