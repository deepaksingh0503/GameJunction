import React from "react";
// Icons
import { BsFillPersonFill } from "react-icons/bs";

const RankCard = ({ user, theme, rank }) => {
  return (
    <li className="w-full flex items-center justify-center">
      <div className="px-4 py-1 sm:py-2 font-semibold text-gray-400 sm:text-lg bg-gray-200/50 rounded-tl-lg rounded-bl-lg">
        <span className="icon-font text-gray-400 text-sm mr-2 font-semibold">
          #
        </span>
        <span>{rank}</span>
      </div>
      <div
        className={`w-full my-4 px-4 py-2 sm:p-4 flex items-center justify-between cursor-pointer rounded-2xl shadow ${
          theme == "dark" ? "bg-cyan-800 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <div className="rounded-full p-1 mr-4 w-10 h-10 flex items-center justify-center bg-gray-100 overflow-hidden">
            {user.profile_pic ? (
              <img src={user.profile_pic} alt="" />
            ) : (
              <BsFillPersonFill className="text-yellow-400 text-lg" />
            )}
          </div>
          <h3 className="sm:text-lg font-semibold font-sans nunito-font">
            {user.name.toUpperCase()}
          </h3>
        </div>
        <div className="hidden sm:flex items-center">
          {user.is_organiser && (
            <div className="w-10 h-10 rounded-full bg-yellow-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
              {user.organiser_rank}
            </div>
          )}
          {user.is_participant && (
            <div className="w-10 h-10 rounded-full bg-teal-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
              {user.participant_rank}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default RankCard;
