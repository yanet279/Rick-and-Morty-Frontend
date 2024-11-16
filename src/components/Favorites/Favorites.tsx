import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { filterFavorites, orderFavorites, reset } from "../../redux/actions";
import { useState, ChangeEvent } from "react";
import { RootState, AppDispatch } from "../../redux/store"; // Make sure to import the correct type for your root state
import { OrderType } from "../../Models/types";
import { Favorite } from "../../Models/interfaces";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.myFavorites as Favorite[]
  );
  console.log("favorites", favorites);
  const [aux, setAux] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOrder = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value as OrderType; // Convierte el valor de 'string' a 'OrderType'
    setAux(!aux);
    dispatch(orderFavorites(value));
  };

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(filterFavorites(value));
  };

  const resetButton = () => {
    dispatch(reset());
  };

  return (
    <div className="flex flex-col items-center justify-center bg-transparent w-full absolute top-40">
      <div className="flex justify-center mt-10 flex-row mx-auto space-x-4">
        <select
          onChange={handleOrder}
          name="order"
          defaultValue={"DEFAULT"}
          className="cursor-pointer text-xl font-bold bg-colorButtonLogin text-black border-4 border-solid border-black text-md rounded-xl p-6 focus:outline-none"
        >
          <option value="DEFAULT" disabled>
            Select Order
          </option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select
          onChange={handleFilter}
          name="filter"
          defaultValue={"DEFAULT"}
          className="cursor-pointer text-xl font-bold bg-colorButtonLogin text-black border-4 border-solid border-black text-md rounded-xl p-6 focus:outline-none"
        >
          <option value="DEFAULT" disabled>
            Select filter
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknow">unknow</option>
        </select>
        <button
          onClick={resetButton}
          className="min-w-[20] p-6 border-solid border-colorBorderForm border-4 rounded-xl text-white bg-transparent font-bold text-xl cursor-pointer hover:border-white transition-transform ease-in-out duration-200"
        >
          RESET
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full mt-8">
        {favorites?.map(
          ({ id, name, species, gender, origin, status, image }: Favorite) => (
            <Card
              id={id}
              key={id}
              name={name}
              species={species}
              gender={gender}
              origin={origin?.name || "Unknown Origin"}
              status={status}
              image={image}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Favorites;
