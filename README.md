**Prompt Play**
Prompt Play is an AI image generation-based multiplayer game where players compete to replicate a random image using image generation prompts. The player whose generated image is most similar to the original wins the round.


**Tech Stack**
Frontend: React
Backend: Node.js, Express
Database: MongoDB
AI Image Generation: DALL·E

**Installation**
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/prompt-play.git
cd prompt-play
Install dependencies for the backend:

bash
Copy code
cd server
npm install
Install dependencies for the frontend:

bash
Copy code
cd ../client
npm install
Set up environment variables:

Create a .env file in the server directory and add your MongoDB URI and DALL·E API key:
makefile
Copy code
MONGO_URI=your_mongo_db_uri
DALL_E_API_KEY=your_dalle_api_key
Start the backend server:

bash
Copy code
cd ../server
npm start
Start the frontend development server:

bash
Copy code
cd ../client
npm start

**Usage**
Open your browser and navigate to http://localhost:3000.
Sign up or log in to your account.
Join a game lobby or create your own.
Wait for the prompt and start generating your image.
Submit your image and see how it ranks against others!




