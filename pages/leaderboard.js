import React, { useEffect, useState } from "react";
// Headless Ui
import { Tab } from "@headlessui/react";
// Custom Components
import RankCard from "../components/RankCard";
// icons
import SpinnerIcon from "../components/SpinnerIcon";
// hooks
import useUser from "../hooks/useUser";
// services
import { leaderboard } from "../Services/User";
// swr
import useSWR from "swr";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const types = ["Organiser", "Participant"];

const Leaderboard = () => {
  const { user } = useUser();
  const [organisers, setOrganisers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const { data, error } = useSWR("LEADERBOARD", leaderboard);

  useEffect(() => {
    if (data) {
      setOrganisers(data.organisers);
      setParticipants(data.participants);
    }
  }, [data]);

  return (
    <div>
      <div className="w-full mx-auto">
        <Tab.Group>
          <Tab.List className="flex w-full bg-white">
            {types.map((type, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full  rounded-t-xl py-2.5 font-sans font-semibold outline-none text-gray-500",
                    selected
                      ? "bg-gray-50"
                      : "text-gray-500 hover:text-green-400"
                  )
                }
              >
                {type.toUpperCase()}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="">
            {types.map((type, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl p-3 bg-gray-50 w-full min-h-[75vh]"
                )}
              >
                {/* {user && (
                  <div>
                  {type.toLowerCase() == "participant" &&
                  user.is_participant && (
                        <div className="w-full sm:w-[80%] mx-auto">
                          <RankCard user={user} theme="dark" />
                        </div>
                      )}
                      {type.toLowerCase() == "organiser" && user.is_organiser && (
                        <div className="w-full sm:w-[80%] mx-auto">
                        <RankCard user={user} theme="dark" />
                        </div>
                    )}
                    </div>
                )} */}
                {!data && (
                  <div className="text-center">
                    <SpinnerIcon />
                  </div>
                )}
                <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
                  {data &&
                    type.toLowerCase() == "organiser" &&
                    organisers.length == 0 &&
                    "More Organisers Coming Soon!"}
                  {data &&
                    type.toLowerCase() == "participant" &&
                    participants.length == 0 &&
                    "More Participants Coming Soon!"}
                  {type.toLowerCase() == "organiser" &&
                    organisers?.map((or, idx) => (
                      <RankCard
                        key={or._id}
                        rank={idx + 1}
                        user={or}
                        type={type.toLowerCase()}
                        theme={user?._id == or._id ? "dark" : "light"}
                      />
                    ))}
                  {type.toLowerCase() == "participant" &&
                    participants?.map((pr, idx) => (
                      <RankCard
                        key={pr._id}
                        rank={idx + 1}
                        user={pr}
                        type={type.toLowerCase()}
                        theme={user?._id == pr._id ? "dark" : "light"}
                      />
                    ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Leaderboard;
