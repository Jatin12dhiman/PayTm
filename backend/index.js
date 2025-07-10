const express = require("express");
const cors = require("cors");
const app = express();

// DEBUG: CORS applied
console.log("CORS middleware applied");

app.use(cors({
  origin: [
    "https://pay-tm-theta.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/api/v1",mainRouter)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});