import React from 'react'


const Play = () => {
  return (
    <div>
      <button onClick={fetchAndSendImage}>Fetch Images</button>
      <div className="flex">
        <img src={normalImage} alt="OG Image" />
        <img src={image} alt="Generated Image" />
      </div>
      <input
        type="text"
        id="promptInput"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <label htmlFor="promptInput">Enter your prompt here: </label>
    </div>
  );
}

export default Play