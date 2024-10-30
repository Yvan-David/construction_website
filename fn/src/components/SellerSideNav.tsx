import profileImage from "../assets/images/profileImage.svg";

import React, { useEffect, useState } from "react";
import Logo from "../assets/images/Screenshot from 2024-10-30 21-33-27.png";
import { CiSearch } from "react-icons/ci";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import axiosClient from "../hooks/AxiosInstance";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";


interface User {
  id: number;
  username: string;
  email: string;
  userRole: string;
  status: string;
  profileImageUrl: string;
}
interface InputProps {
  heading?: string;
  subheading?: string;
  color?: string | any;
  icon?: any;
}

const DashBoardSideBar: React.FC<InputProps> = () => {
  const [isSelected, setIsSelected] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const unreadMessagesCount = useSelector(
    (state: RootState) => state.chat.unreadMessagesCount,
  );
  const navigate = useNavigate();
  const notify = (message: string) => toast(message);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const client = axiosClient();
  const fetchUserProfile = async () => {
    try {
      const response = await client.get("/users/profile");
      setUser(response.data);
    } catch (err: any) {
      notify(err.response ? err : "Fetching users failed");
    } finally {
      setIsLoading(false);
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