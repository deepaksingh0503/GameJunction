import React, { Fragment, useContext, useEffect, useState } from "react";
// Next components
import Link from "next/link";
// Headless Ui
import { Menu, Transition } from "@headlessui/react";
// Icons
import { HiOutlineBars3BottomLeft, HiOutlineUserGroup } from "react-icons/hi2";
import { HiStar, HiLogout, HiLogin } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsCalendarEvent } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import {
  MdOutlineHelpOutline,
  MdOutlineAdminPanelSettings,
  MdTravelExplore,
  MdLeaderboard,
} from "react-icons/md";
// Context
import { AppContext } from "../context/AppContext";
// hooks
import useUser from "../hooks/useUser";

const iconStyle = "text-lg mr-2";

const NavDropdown = () => {
  const { handleLogout } = useContext(AppContext);
  const { user } = useUser();

  return (
    <div className="ml-8">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full p-2 cursor-pointer bg-gray-600 shadow-md">
            <HiOutlineBars3BottomLeft className="text-white text-2xl" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-[10] px-4 py-1 right-0 mt-2 w-56 origin-top-right rounded-md text-white bg-gray-600 shadow">
            {!user && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/signin">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <HiLogin className={iconStyle} />
                        SignIn
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            <div className="px-1 py-1 md:hidden">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/list">
                    <button
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdTravelExplore className={iconStyle} />
                      Explore Events
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 md:hidden">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/leaderboard">
                    <button
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdLeaderboard className={iconStyle} />
                      Leaderboard
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            {user && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <CgProfile className={iconStyle} />
                        Profile
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {user && user.is_organiser && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/organise-event">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <IoCreateOutline className={iconStyle} />
                        Create Event
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {user && user.is_participant && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/teams">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <HiOutlineUserGroup
                          className={`text-base ${iconStyle}`}
                        />
                        My Teams
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {user && user.is_participant && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile#pastevents">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <BsCalendarEvent className={`text-base ${iconStyle}`} />
                        My Participations
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {user && (user.is_organiser || user.is_admin) && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/admin">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <MdOutlineAdminPanelSettings className={iconStyle} />
                        Admin Panel
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {user && user.is_participant && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile#wishevents">
                      <button
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <HiStar className={iconStyle} />
                        WishList
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/contact">
                    <button
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlineHelpOutline className={iconStyle} />
                      Contact Team
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            {user && (
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/">
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <HiLogout className={iconStyle} />
                        Logout
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavDropdown;
