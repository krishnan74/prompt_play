const express = require("express");
const cors = require("cors");
require("dotenv").config();


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
