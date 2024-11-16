import Card from "../Card/Card";
import { CardsProps } from "../../Models/interfaces";

export default function Cards({ characters, onClose }: CardsProps) {
  return (
    <div className="flex justify-evenly flex-wrap bg-transparent w-full absolute top-40">
      {characters.map(
        ({ id, name, species, gender, origin, status, image, className }) => {
          return (
            <Card
              id={id}
              key={id}
              name={name}
              species={species}
              gender={gender}
              origin={origin.name}
              status={status}
              image={image}
              onClose={() => onClose(id)} // Se pasa el id para identificar qué card se cierra
              className={className}
            />
          );
        }
      )}
    </div>
  );
}
