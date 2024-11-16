import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Character } from "../../Models/interfaces";

const Detail = () => {
  const { id } = useParams<{ id: string }>(); // Aseguramos que id es de tipo string
  const [character, setCharacter] = useState<Character | null>(null); // Estado inicial puede ser null

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
        window.alert("Error al obtener los datos del personaje");
      });
  }, [id]);

  return (
    <div>
      {character ? (
        <>
          <h2>{character.name}</h2>
          <p>{character.status}</p>
          <p>{character.species}</p>
          <p>{character.gender}</p>
          <p>{character.origin?.name}</p>
          <img src={character.image} alt={character.name} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
