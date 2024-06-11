import React, { useState } from "react";
import Layout from "../Layout";
import { RxEnter } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { hatImages } from "../utils/images";
import { faceImages } from "../utils/images";

const Play = () => {
  const [enteredCode, setEnteredCode] = useState("");
  const [newLobbyName, setNewLobbyName] = useState("");
  const [gameName, setGameName] = useState("");
  const [hatNumber, setHatNumber] = useState(1);
  const [faceNumber, setFaceNumber] = useState(1);
  const [shirtNumber, setShirtNumber] = useState(1);

  const handleDecrement = (setter, value, min, max) => {
    setter(value === min ? max : value - 1);
  };

  const handleIncrement = (setter, value, min, max) => {
    setter(value === max ? min : value + 1);
  };

  const createLobby = async () => {
    const data = await fetch("http://localhost:5000/createLobby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lobbyName: newLobbyName,
        lobbyOwnerName: gameName,
        hatNumber: hatNumber,
        faceNumber: faceNumber,
      }),
    });
    const response = await data.json();
    console.log(response);
    window.location.href = `/lobby?lobbyId=${response.lobbyId}`;
  };

  const joinLobby = async () => {
    const data = await fetch("http://localhost:5000/joinLobby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lobbyId: enteredCode,
        playerName: gameName,
        hatNumber: hatNumber,
        faceNumber: faceNumber,
      }),
    });
    const response = await data.json();
    console.log(response);
    window.location.href = `/lobby?lobbyId=${response.lobbyId}`;
  };

  return (
    <Layout>
      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col w-[30%] gap-5">
          <p className="text-white text-2xl font-bold ">
            Customize your character
          </p>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="px-4 py-2 rounded-md text-black  h-10"
          />
        </div>

        <div className="flex  justify-center items-center w-[30%] border border-white relative h-[200px] rounded-md">
          <p className="text-white text-2xl font-bold absolute top-5 ">
            {gameName}
          </p>
          <div className="flex justify-evenly items-center absolute z-10 top-5">
            <button
              onClick={() => handleDecrement(setHatNumber, hatNumber, 1, 9)}
            >
              <FaCaretLeft color="white" size={30} />
            </button>
            <img
              className=""
              height={160}
              width={160}
              src={hatImages[hatNumber - 1]}
              alt={`Hat ${hatNumber}`}
            />

            <button
              onClick={() => handleIncrement(setHatNumber, hatNumber, 1, 9)}
            >
              <FaCaretRight color="white" size={30} />
            </button>
          </div>
          <div className="flex w-[full] justify-evenly items-center absolute bottom-5">
            <button
              className="z-10"
              onClick={() => handleDecrement(setFaceNumber, faceNumber, 1, 4)}
            >
              <FaCaretLeft color="white" size={30} />
            </button>
            <img
              height={70}
              width={100}
              src={faceImages[faceNumber - 1]}
              alt={`Face ${faceNumber}`}
            />
            <button
              className="z-10"
              onClick={() => handleIncrement(setFaceNumber, faceNumber, 1, 4)}
            >
              <FaCaretRight color="white" size={30} />
            </button>
          </div>
          {/* <div className="flex w-[full] justify-evenly">
            <FaCaretLeft color="white" />
            <img
              src={
                require(`../assets/characterImages/shirts/shirt${shirtNumber}.png`)
                  .default
              }
              alt={`Shirt ${shirtNumber}`}
            />
            <FaCaretRight color="white" />
          </div> */}
        </div>
      </div>

      <div className="flex justify-center mb-10"></div>

      <div className="flex justify-evenly text-white">
        <div className="flex flex-col border-white p-10 border rounded-md items-center justify-center gap-5 ">
          <IoIosAddCircleOutline size={100} />
          <p>Create New Lobby</p>
          <input
            type="text"
            placeholder="Enter Lobby Name"
            className="px-4 py-2 rounded-md text-black"
            value={newLobbyName}
            onChange={(e) => setNewLobbyName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-[#FFD700] rounded-md text-black"
            onClick={createLobby}
          >
            Create
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-white p-10 border rounded-md gap-5">
          <RxEnter size={100} />
          <p>Join your friend's lobby</p>
          <input
            type="text"
            placeholder="Enter Code"
            className="px-4 py-2 rounded-md text-black"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
          />
          <button
            onClick={joinLobby}
            className="px-4 py-2 bg-[#FFD700] rounded-md text-black"
          >
            Join
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Play;
