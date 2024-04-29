import React from "react";

const PlayerScoreCard = (props) => {
  return (
    <div className="flex gap-3 text-white">
      <div className="w-1/2">
        <img
          src={props.image}
          alt={props.name}
          className="w-20 h-20 rounded-full"
        />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">{props.name}</h2>
        <p>Score: {props.score}</p>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
