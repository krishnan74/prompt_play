import React, { useEffect } from "react";
import PlayerScoreCard from "../components/PlayerScoreCard";
import Layout from "../Layout";
import { useState } from "react";
import normalImage from "../assets/images/bot1.jpeg";
import { BsCopy } from "react-icons/bs";

import { useLocation } from "react-router-dom";

const Lobby = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [players, setPlayers] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lobbyId = searchParams.get("lobbyId");

  useEffect(() => {
    getParitcipants();
    getRandomImage();
  }, []);

  const getRandomImage = async () => {
    const randomNumber = Math.floor(Math.random() * (500 - 1) + 1);
    const randomImage = await fetch(
      `https://picsum.photos/id/${randomNumber}/200/300`
    );
    console.log(randomImage.url);
    setImage(randomImage.url);
  };

  const getParitcipants = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getParitcipants?lobbyId=${lobbyId}`
      );
      const data = await response.json();
      setPlayers(data);
      console.log(data);
    } catch (error) {
      console.error("error:" + error);
    }
  };

  const OPEN_AI_API_KEY = "";

  const createAIImage = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          response_format: "b64_json",
        }),
      };

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );

      const data = await response.json();
      const generatedImageBase64 = data.data[0].b64_json;
      setImage(`data:image/jpeg;base64,${generatedImageBase64}`);

      const normalImageBase64 = normalImage.split(",")[1];
      const serverResponse = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aiImage: generatedImageBase64,
          normalImage: normalImageBase64,
        }),
      });

      const serverData = await serverResponse.json();
      console.log(serverData);
    } catch (error) {
      console.error("error:" + error);
    }
  };

  const sendAiImageToServer = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          image: image,
        }),
      };

      const response = await fetch("http://localhost:5000/sendImage", options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("error:" + error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col text-white">
        <div className="flex justify-center items-center gap-x-3 mb-4">
          <h1 className="text-5xl font-bold tracking-wide font-['Teko']  text-center stroke-[#FFD700] ">
            Lobby Code
          </h1>
          <p className="text-xl">#{lobbyId}</p>
          <button onClick={() => navigator.clipboard.writeText(lobbyId)}>
            <BsCopy />
          </button>
        </div>

        <div className="flex h-[75vh] flex-wrap justify-center gap-10">
          <div
            className="w-[25%] border border-white h-full flex flex-col min-w-[300px] p-10
           overflow-y-auto gap-5
          "
          >
            {players.map((player) => {
              return (
                <PlayerScoreCard
                  name={player.playerName}
                  score={player.score}
                  hatNumber={player.hatNumber}
                  faceNumber={player.faceNumber}
                />
              );
            })}
          </div>

          <div className="flex flex-col  h-full w-[70%] border border-white min-w-[320px] justify-center items-center ">
            <img src={image} alt="" />
            <p>
              Replicate this image by entering the AI image generation prompt
              ....
            </p>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter the prompt"
              className="border border-black py-2 w-[50%] rounded-lg mt-5 text-black px-4 min-w-[300px]"
            />
            <button onClick={sendAiImageToServer}>Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;
