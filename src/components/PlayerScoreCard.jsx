import React from "react";
import { hatImages } from "../utils/images";
import { faceImages } from "../utils/images";

const PlayerScoreCard = (props) => {
  return (
    <div className="flex gap-3 text-white items-end justify-center">
      <div className="w-1/2 relative flex flex-col justify-center items-center">
        <img
          height={100}
          width={100}
          className="aboslute top-0 z-10"
          src={hatImages[props.hatNumber - 1]}
          alt=""
        />
        <img
          height={80}
          width={80}
          className="absolute top-10"
          src={faceImages[props.faceNumber - 1]}
          alt=""
        />

        {/* <img
          src={props.image}
          alt={props.name}
          className="w-20 h-20 rounded-full"
        /> */}
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">{props.name}</h2>
        <p>Score: {props.score}</p>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
