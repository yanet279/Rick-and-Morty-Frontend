import { useState, ChangeEvent, KeyboardEvent, FC } from "react";
import { SearchBarProps } from "../../Models/interfaces";
import { Search } from "lucide-react";

interface Props extends SearchBarProps {
  className?: string;
}

const SearchBar: FC<Props> = ({ onSearch, className = "" }) => {
  const [id, setId] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false); // Controla la visibilidad del input

  // Maneja el cambio en el input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  // Maneja el evento de presionar la tecla Enter
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        onSearch(numericId);
      }
    }
  };

  return (
    <div className={`flex flex-row-reverse w-[88%] absolute top-14 sm:relative sm:top-1 ${isVisible ? "" : "flex-row" } ${className}`}
    >
      <button className="bg-customDarkBlue border-4 border-white rounded-full w-[52px] h-12 focus:outline-none cursor-pointer transition-transform ease-in-out hover:scale-110 duration-200 z-20 flex items-center relative right-0 sm:w-16 sm:h-[50px] -top-0.5 md:w-[60px] lg:w-[70px] lg:h-[60px]"
        onClick={() => {
          if (window.innerWidth < 640) {
            setIsVisible(!isVisible); // Alternar visibilidad en tamaños menores a lg
          }
        }}
      >
        <Search className="text-[#fff] mx-auto w-6 h-6 lg:w-8 lg:h-8 xl:w-9 xl:h-9" />
      </button>
      <input
        className={`right-[-22px] w-full relative sm:top-1 sm:block h-[42px] sm:h-11 lg:h-[50px] ${isVisible ? "block" : " hidden sm:block"} lg:h-14 rounded-lg border-solid border-4 border-white bg-transparent lg:text-lg lg:py-2 px-4 lg:font-bold placeholder:text-white focus:outline-none text-white transition-all duration-300 md:py-1.5`}
        type="search"
        placeholder="¿Dónde está el Sr. Pantalones de 💩?"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;