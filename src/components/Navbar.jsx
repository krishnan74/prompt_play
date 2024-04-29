import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between h-[120px] px-10 items-center">
      <p className="text-3xl text-[#FFD700] font-bold font-['Teko'] ">
        Prompt Play
      </p>
      <button className="bg-[#FFD700] px-5 py-2">Play Game</button>
    </div>
  );
};

export default Navbar;
