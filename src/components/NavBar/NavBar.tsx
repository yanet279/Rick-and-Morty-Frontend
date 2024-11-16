import React from "react";
import SearchBar from "../SearBar/SearchBar";
import { NavBarProps } from "../../Models/interfaces";
import { UserRound } from "lucide-react";


const NavBar: React.FC<
  NavBarProps & {
    setActiveView: React.Dispatch<React.SetStateAction<"home" | "favorites">>;
    onLoginClick: () => void;
    profileImage: string | null; // Imagen de perfil
  }
> = (props) => {
  const handleRandom = () => {
    const min = 1;
    const max = 826;
    let randomNumber: number;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (props.characters.some((char) => char.id === randomNumber));

    if (typeof props.onSearch === "function") {
      props.onSearch(randomNumber);
    }
  };

  return (
    <div className={`bg-transparent flex px-6 top-5 w-full absolute z-50 lg:px-10${props.className || "" }`}>
      <div className="flex items-center relative justify-around sm:justify-between w-full sm:gap-4">
        <div className="flex gap-2 mr-4 sm:mr-0 lg:gap-5 xl:gap-7">
          <button onClick={() => props.setActiveView("home")} className="min-w-[80px] p-1 border-4 border-colorBorderForm rounded-xl no-underline text-white font-semibold cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out md:text-lg md:px-3 md:py-1 lg:text-xl lg:px-3 lg:py-2 xl:text-2xl xl:px-4 xl:py-3">Home</button>
          <button onClick={handleRandom} className="min-w-[90px] my-0 p-1 bg-colorButtonLogin border-[2px] border-black border-solid rounded-xl no-underline text-black font-bold cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out md:text-lg md:px-3 md:py-1 lg:text-xl lg:px-3 lg:py-2 xl:text-2xl xl:px-4 xl:py-3">Random</button>
        </div>
        <SearchBar onSearch={props.onSearch} className="mr-2 lg:w-[50%]"/>
        <div className="flex gap-2 lg:gap-5 xl:gap-7">
          <button onClick={() => props.setActiveView("favorites")} className="min-w-[95px] bg-colorButtonLogin p-1.5 border-[2px] border-black rounded-xl no-underline text-black font-bold  cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out md:text-lg md:px-3 md:py-1 lg:text-xl lg:px-3 lg:py-2 xl:text-2xl xl:px-4 xl:py-3"
          >Favorites</button>
          {props.profileImage ? (
            <img
              src={props.profileImage}
              alt="Perfil"
              className="w-16 h-16 rounded-full border-4 border-colorBorderForm"
            />
          ) : (
            <button onClick={props.onLoginClick}>
              <UserRound className="text-colorBorderForm border-4 border-colorBorderForm rounded-full w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] xl:w-[50px] xl:h-[50px]"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;