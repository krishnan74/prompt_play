import React, { useState } from "react";
import normalImage from "./assets/images/lion.jpeg";
import Layout from "./Layout";
import aiImage from "./assets/images/bot2.jpeg";

const App = () => {
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

  return (
    <Layout>
      <div className="flex justify-center items-center text-white">
        <label htmlFor="promptInput">Enter your prompt here: </label>
        <input
          type="text"
          id="promptInput"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={fetchAndSendImage}>Fetch Images</button>
        <div className="flex">
          <img src={normalImage} alt="OG Image" />
          <img src={image} alt="Generated Image" />
        </div>
      </div>
    </Layout>
  );
};

export default App;
