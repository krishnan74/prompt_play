import React from "react";
import PlayerScoreCard from "../components/PlayerScoreCard";
import Layout from "../Layout";
import { useState } from "react";
import normalImage from "../assets/images/bot1.jpeg";

const Lobby = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const OPEN_AI_API_KEY = "";
  const fetchAndSendImage = async () => {
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

  const players = [
    {
      name: "Player 1",
      score: 0,
      image: "https://randomuser.me/api/portraits",
    },
    {
      name: "Player 2",
      score: 0,
      image: "https://randomuser.me/api/portraits",
    },
    {
      name: "Player 3",
      score: 0,
      image: "https://randomuser.me/api/portraits",
    },
    {
      name: "Player 4",
      score: 0,
      image: "https://randomuser.me/api/portraits",
    },
  ];
  return (
    <Layout>
      <div className="flex flex-col text-white">
        <div className="flex justify-center items-center gap-x-3 mb-4">
          <h1 className="text-5xl font-bold tracking-wide font-['Teko']  text-center stroke-[#FFD700] ">
            Lobby
          </h1>
          <p className="text-xl">#F98As09d8a</p>
        </div>

        <div className="flex h-[70vh] flex-wrap justify-center gap-10">
          <div className="w-[25%] border border-white h-full flex flex-col min-w-[300px] p-10">
            {players.map((player) => {
              return (
                <PlayerScoreCard
                  name={player.name}
                  score={player.score}
                  image={player.image}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;
