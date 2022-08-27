const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./db/db");
const Jogo = require("./db/Jogo");

//DATABASE
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados feita com sucesso!");
  })
  .catch((msgErro) => {
    console.log("Algo deu errado.");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/jogos", async (req, res) => {
  const jogos = await Jogo.findAll();
  res.json(jogos);
});

app.get("/games/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var game = Jogo.game.find((g) => g.id == id);

    if (game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body;

  Jogo.create({
    title: title,
    price: price,
    year: year,
  });

  res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var index = Jogo.games.findIndex((g) => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      Jogo.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var game = Jogo.games.find((g) => g.id == id);

    if (game != undefined) {
      var { title, price, year } = req.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(45678, () => {
  console.log("API RODANDO!");
});
