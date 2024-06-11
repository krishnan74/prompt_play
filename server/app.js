const express = require("express");
const cors = require("cors");
require("dotenv").config();
const uuid = require("uuid");

const { MongoClient } = require("mongodb");
const { ServerApiVersion } = require("mongodb");
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://divyakrishnanr74:krishnanoo7@chatapp.9px7we3.mongodb.net/?retryWrites=true&w=majority",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getParitcipants", async (req, res) => {
  try {
    const { lobbyId } = req.query;
    const myDB = client.db("LobbyDB");
    const myColl = myDB.collection("lobbies");

    const result = await myColl.findOne({
      lobbyId: lobbyId,
    });
    res.send(result.players);
  } catch (error) {
    console.error("error:" + error);
    res.send({ error: error });
  }
});

app.post("/createLobby", async (req, res) => {
  try {
    const { lobbyName, lobbyOwnerName, hatNumber, faceNumber } = req.body;
    const myDB = client.db("LobbyDB");
    const myColl = myDB.collection("lobbies");

    var newLobbyId = uuid.v4();

    if (myColl.findOne({ lobbyId: newLobbyId })) {
      newLobbyId = uuid.v4();
    }

    const doc = {
      lobbyName: lobbyName,
      lobbyOwnerName: lobbyOwnerName,
      lobbyId: newLobbyId.substring(0, 6),
      players: [
        {
          playerName: lobbyOwnerName,
          isOwner: true,
          score: 0,
          hatNumber: hatNumber,
          faceNumber: faceNumber,
        },
      ],
    };

    const result = await myColl.insertOne(doc);
    return res.send({ lobbyId: newLobbyId.substring(0, 6) });
  } catch (error) {
    console.error("error:" + error);
    res.send({ error: error });
  }
});

app.post("/joinLobby", async (req, res) => {
  try {
    const { lobbyId, playerName, hatNumber, faceNumber } = req.body;
    const myDB = client.db("LobbyDB");
    const myColl = myDB.collection("lobbies");

    const result = await myColl.findOne({
      lobbyId: lobbyId,
    });

    const player = {
      playerName: playerName,
      isOwner: false,
      score: 0,
      hatNumber: hatNumber,
      faceNumber: faceNumber,
    };

    if (result) {
      const players = result.players;
      players.push(player);
      const updatedResult = await myColl.updateOne(
        { lobbyId: lobbyId },
        { $set: { players: players } }
      );
      return res.send({ success: true, lobbyId: lobbyId });
    }
    return res.send({ success: false });
  } catch (error) {
    console.error("error:" + error);
    res.send({ error: error });
  }
});

app.post("/sendImage", async (req, res) => {
  const { image, prompt } = req.body;
  const myDB = client.db("AiImagesDB");
  const myColl = myDB.collection("Images");

  const doc = {
    imageBase64: image,
    description: prompt,
  };

  const result = await myColl.insertOne(doc);

  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
});

app.listen(port, () => {
  try {
    client.connect();
  } catch (error) {
    console.error("error:" + error);
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
