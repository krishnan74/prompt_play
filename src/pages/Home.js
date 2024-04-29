import React, { useState } from "react";
import normalImage from "../assets/images/lion.jpeg";
import Layout from "../Layout";
import demoImage from "../assets/images/demo.jpg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  

  return (
    <Layout>
      <div className="flex items-center text-white flex-col pt-10 hero">
        <div className="flex flex-col items-center w-[80%] ">
          <h2 className="text-6xl font-bold tracking-wide font-['Teko'] mb-4 text-center stroke-[#FFD700]">
            Unleash Your <span className="">Creativity</span> <br />
            Master the Challenge
          </h2>
          <p className="text-left text-lg  md:text-center ">
            Dive into the world of limitless imagination with Prompt Play – the
            ultimate AI image generation multiplayer game. Challenge your
            artistic prowess, compete with friends, and embark on a journey
            where creativity meets competition.
          </p>
        </div>

        <div className="w-[75%] min-w-[300px] mt-[60px] bg-[white] p-1 rounded-lg">
          <img src={demoImage} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
