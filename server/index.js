const express = require("express");
const cors = require("cors");
const grassCtrl = require("./controllers/grassController");

const app = express();
const PORT = 4060;

app.use(cors());
app.use(express.json());

app.get("/api/wild-pokemon", grassCtrl.getWildPokemon);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
