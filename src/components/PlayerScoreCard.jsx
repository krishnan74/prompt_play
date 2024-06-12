import React from "react";
import { hatImages } from "../utils/images";
import { faceImages } from "../utils/images";

const PlayerScoreCard = (props) => {
  return (
    <div className="flex  text-white items-center justify-center  border border-white py-7 rounded-md bg-[rgba(255,255,255,0.1)]">
      <div className="w-[50%] relative flex flex-col justify-center items-center ">
        <img
          height={80}
          width={80}
          className="absolute top-[-60px] z-10"
          src={hatImages[props.hatNumber - 1]}
          alt=""
        />
        <img
          height={60}
          width={60}
          className="absolute top-[]  "
          src={faceImages[props.faceNumber - 1]}
          alt=""
        />

        {/* <img
          src={props.image}
          alt={props.name}
          className="w-20 h-20 rounded-full"
        /> */}
      </div>
      <div className="w-[70%]">
        <h2 className="text-xl font-bold">{props.name}</h2>
        <p>Score: {props.score}</p>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
