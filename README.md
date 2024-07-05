# Prompt Play

Prompt Play is an AI image generation-based multiplayer game where players compete to replicate a random image using image generation prompts. The player whose generated image is most similar to the original wins the round.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)


## Features

- **Real-Time Multiplayer:** Compete with players in real-time rounds.
- **Unique Prompts:** Generate images based on diverse prompts.
- **AI-Powered:** Uses DALL·E for advanced image generation.
- **Scoring System:** Objective scoring based on similarity to the original image.
- **Community Interaction:** Engage with other players through chat and leaderboards.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Image Generation:** DALL·E

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/prompt-play.git
   cd prompt-play
   
2. **Install dependencies:**
   ```bash
    npm install
3. **Install dependencies for the backend:**
   ```bash
   cd server
   npm install
4. **Set up environment variables:**
   Create a .env file in the server directory and add your MongoDB URI and DALL·E API key:
   ```bash
   MONGO_URI=your_mongo_db_uri
   DALL_E_API_KEY=your_dalle_api_key
5. **Start the application:**
   ```bash
   npm run start

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. Sign up or log in to your account.
3. Join a game lobby or create your own.
4. Wait for the prompt and start generating your image.
5. Submit your image and see how it ranks against others!
