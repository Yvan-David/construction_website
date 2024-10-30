

import React, { useEffect, useState } from "react";
import Logo from "../assets/images/Screenshot from 2024-10-30 21-33-27.png";
import { CiSearch } from "react-icons/ci";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";



interface InputProps {
  heading?: string;
  subheading?: string;
  color?: string | any;
  icon?: any;
}

const DashBoardSideBar: React.FC<InputProps> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);


  const navigate = useNavigate();
  const notify = (message: string) => toast(message);

  const fetchUserProfile = async () => {
    try {

    } catch (err: any) {
      notify(err.response ? err : "Fetching users failed");
    } finally {

    }
  };
  const navigateToHome = () =>{
    navigate('/')
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div
      data-testid="side-nav"
      className={
        showMenu
          ? "flex p-3 tablet:p-7 pb-2 resize-x items-center justify-between  flex-col tablet:w-[20%] bg-white border border-gray_100 rounded h-full transition-all"
          : "flex p-4 w-24 pb-2 resize-x items-center justify-between  flex-col  bg-white border border-gray_100 rounded h-full transition-all"
      }
    >
      <div className=" w-full flex items-center justify-between   gap-3">
        {showMenu && (
          <button onClick={navigateToHome}>
          <img
            src={Logo}
            alt=""
            className="w-16 tablet:w-24  tablet:flex p-2 "
          />
          </button>
        )}
        {showMenu ? (
          <IoIosArrowBack
            className="text-2xl tablet:text-4xl self-end mx-auto bg-black text-white rounded-full p-1"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            data-testid="menu-toggle-button"
          />
        ) : (
          <IoIosArrowForward
            className="text-xl tablet:text-3xl mx-auto  bg-black text-white rounded-full p-1  "
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            data-testid="menu-toggle-button2"
          />
        )}
      </div>

      <div className="search flex items-center self-start gap-2 justify-start rounded-full p-2  border border-gray_100 my-3 w-full">
        <CiSearch className="text-xl self-center " />
        {showMenu && (
          <input
            type="text"
            placeholder="Search ..."
            className="rounded flex p-1 w-full outline-none tablet:w-full  text-black text-sm bg-transparent"
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardSideBar;