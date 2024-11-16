
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFav } from "../../redux/actions";
import { useEffect, useState } from "react";
import { CardProps } from "../../Models/interfaces";

function Card({
  id,
  name,
  species,
  gender,
  image,
  origin,
  status,
  onClose,
  addFavorite,
  removeFavorite,
  myFavorites,
}: CardProps) {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      removeFavorite(id);
      return;
    }
    setIsFav(true);
    addFavorite({
      id,
      name,
      species,
      gender,
      image,
      origin,
      status,
    });
  };

  useEffect(() => {
    myFavorites?.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites, id]);

  const hasOnClose = typeof onClose === "function";

  return (
    <div className="text-colorText mx-16 my-10 flex flex-col">
      <div className="relative">
        {isFav ? (
          <button
            onClick={handleFavorite}
            className="absolute top-[14px] left-[7px] border-colorBlack border-[4px] rounded-full w-10 h-10 hover:transform hover:scale-140 hover:transition-transform hover:duration-200 hover:ease-in-out  bg-colorButtonFavorite"
          >
            ❤️
          </button>
        ) : (
          <button
            onClick={handleFavorite}
            className="absolute top-[14px] left-[7px] z-10 border-colorBlack border-[4px] rounded-full w-10 h-10 bg-colorButtonFavorite text-xl hover:transform hover:scale-140 hover:transition-transform hover:duration-200 hover:ease-in-out"
          >
            🤍
          </button>
        )}
        {hasOnClose ? (
          <button
            onClick={() => onClose(id)}
            className="absolute top-[14px] right-[7px] bg-colorButtonCancel font-bold w-10 h-10 rounded-full border-[4px] border-colorBlack text-xl z-10 hover:transform hover:scale-140 hover:transition-transform hover:duration-200 hover:ease-in-out"
          >
            X
          </button>
        ) : null}
        <Link to={`/detail/${id}`}>
          <img
            className="hover:transform hover:transition-transform hover:duration-500 hover:ease hover:rotate-360 rounded-full w-[200px] h-[200px] border-[4px] border-colorBlack"
            src={image}
            alt=""
          />
          <h2 className="absolute left-0 right-0 -bottom-10 bg-colorButtonTitle p-2 text-colorBlack w-[100px] m-auto text-shadow-white rounded-lg">
            {name}
          </h2>
        </Link>
      </div>
      <div className="text-shadow-md mt-12 w-[200px]">
        <p className="font-bold">⚰️ Status: {status}</p>
        <p className="font-bold">👽️ Species: {species}</p>
        <p className="font-bold">🍑 Gender: {gender}</p>
        <p className="font-bold">🌎 Origin: {origin}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    myFavorites: state.myFavorites || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addFavorite: (character: any) => {
      dispatch(addFavorite(character));
    },
    removeFavorite: (id: number) => {
      dispatch(removeFav(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
