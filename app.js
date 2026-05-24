const express = require("express");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "MediTrack API is running" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});