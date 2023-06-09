import React from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Header from "../components/Header";
import About from "../components/About";
// Icons
import { ImAndroid } from "react-icons/im";
import { TbHomeInfinity } from "react-icons/tb";

const Home = () => {
  return (
    <div className="">
      <Header />

      {/* Android App Section */}
      <div
        id="hideAppSection"
        className="w-full px-12 py-8 flex items-center justify-center flex-col"
      >
        <p className="text-lg md:text-2xl font-semibold text-gray-400">
          For more
        </p>
        <h2 className="text-3xl md:text-5xl text-center font-semibold text-gray-500">
          Seamless and Stable Experience
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-400">Try</p>
        <Link
          href="/gamejunction.apk"
          download={true}
          className="px-6 py-2 my-8 rounded-full bg-white shadow-md w-fit flex items-center justify-center outline-none border-none"
        >
          <ImAndroid className="mr-4 text-green-400 text-xl" />
          <span className="text-green-400 font-semibold">Download App</span>
        </Link>
      </div>

      <About />

      {/* Junction Points */}
      <div className="w-[90%] mb-16 nunito-font p-8 sm:p-12 mx-auto rounded-2xl shadow bg-gray-50">
        <div>
          <h2 className="text-2xl flex items-center text-teal-300">
            <TbHomeInfinity className="mr-2 text-3xl sm:text-4xl" />
            <span className="font-semibold">Junction Points</span>
          </h2>
          <p className="my-2 text-lg text-gray-400">
            A way to build your portfolio!
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-lg my-2">Use of junction points ?</h2>
          <p className="text-gray-600 md:w-1/2">
            It defines the creadibility of a player or a organiser on our
            platform higher the junction points higher is the leaderboard
            ranking in our platform!
          </p>
        </div>
        <p className="my-6 block text-lg">
          Factors Influencing Junction Points :
        </p>
        <div>
          <h2 className="font-semibold my-2">For Participants</h2>
          <ul className="text-gray-600">
            <li>~ Participation in events.</li>
            <li>~ Winning an event.</li>
            <li>~ Activity on the platform and time spent.</li>
          </ul>
          <h2 className="font-semibold my-2 mt-6">For Organisers</h2>
          <ul className="text-gray-600">
            <li>~ Organising events.</li>
            <li>~ Concluding Event by selecting winner.</li>
            <li>~ Number of participations in your events.</li>
          </ul>
        </div>
      </div>

      {/* Game Section */}
      <div className="w-[90%] mb-16 p-8 sm:p-12 flex flex-wrap items-center justify-between mx-auto rounded-2xl shadow bg-gradient-to-r from-[#091921] to-cyan-500">
        <div>
          <h2 className="text-2xl sm:text-3xl text-[white]">
            Have a unique game in mind ?
          </h2>
          <p className="my-2 text-lg sm:text-xl text-white">
            Suggest us to add it in our list !
          </p>
        </div>
        <Link href="/suggest-game">
          <button className="px-6 py-2 mt-4 sm:mt-0 rounded-full bg-white hover:bg-yellow-300 shadow text-gray-500 font-semibold">
            Suggest Game
          </button>
        </Link>
      </div>

      {/* Advertisment Section */}
      <div className="w-[90%] my-8 p-8 sm:p-12 flex flex-wrap items-center justify-between mx-auto rounded-2xl shadow bg-gradient-to-r from-gray-800 to-green-500">
        <div>
          <h2 className="text-2xl text-[white]">
            Want to showcase your brand with us?
          </h2>
          <p className="my-2 text-lg text-white">
            Contact Us with for you advertisment requirements and we will get
            back to you as soon as possible
          </p>
        </div>
        <Link href={`mailto:game.junction.official@gmail.com`}>
          <button className="px-6 py-2 mt-4 sm:mt-0 rounded-full bg-white hover:bg-yellow-300 shadow text-gray-500 font-semibold">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
