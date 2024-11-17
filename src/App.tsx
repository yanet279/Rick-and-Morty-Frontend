import { useEffect, useRef, useState } from "react";
import video from "./assets/video-fondo.mp4";
import useProject from "./hooks/UseProject";
import { throttle } from "lodash";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import { getCharacterById } from "./Services/GET/getCharacters";
import { Character, UserDataApp } from "./Models/interfaces";
import Cards from "./components/Cards/Cards";
import Favorites from "./components/Favorites/Favorites";
import Form from "./components/Form/Form";
import { loginUser } from "./Services/GET/getUser";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const [access, setAccess] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeView, setActiveView] = useState<"home" | "favorites">("home");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null); // Imagen de perfil
  const { setScrollY, setScreenHeight } = useProject();
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const anteriorY = useRef(0);
  const maxVideoTime = 19;
  const [scrollHeightFactor, setScrollHeightFactor] = useState(2000);

  useEffect(() => {
    const adjustScrollHeightFactor = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const factor = Math.max(pageHeight - windowHeight, 2000);
      setScrollHeightFactor(factor);
    };

    adjustScrollHeightFactor();
    window.addEventListener("resize", adjustScrollHeightFactor);
    return () => {
      window.removeEventListener("resize", adjustScrollHeightFactor);
    };
  }, []);

  useEffect(() => {
    const updateScrollY = throttle(() => {
      const newY = window.scrollY;
      const deltaY = newY - anteriorY.current;

      const framesToAdvance = deltaY / (scrollHeightFactor / maxVideoTime);

      if (playerRef.current) {
        const currentTime = playerRef.current.currentTime;
        let newTime = currentTime + framesToAdvance;
        newTime = Math.min(Math.max(newTime, 0), maxVideoTime);
        playerRef.current.currentTime = newTime;
      }

      anteriorY.current = newY;
      setScrollY(newY);
    }, 100);

    window.addEventListener("scroll", updateScrollY);
    return () => {
      window.removeEventListener("scroll", updateScrollY);
    };
  }, [scrollHeightFactor, setScrollY]);

  useEffect(() => {
    if (playerRef.current) {
      if (window.scrollY === 0) {
        playerRef.current.currentTime = 0;
      } else if (window.scrollY >= scrollHeightFactor) {
        playerRef.current.currentTime = maxVideoTime;
      }
    }

    setScreenHeight(window.innerHeight);
  }, [scrollHeightFactor, setScreenHeight]);

  const onClose = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const onSearch = async (id: string | number) => {
    try {
      const stringId = String(id);
      const response = await getCharacterById(stringId);
      const data = response.data;

      if (data.name) {
        const characterRep = characters.find((char) => char.id === data.id);
        if (characterRep) {
          return alert("Personaje repetido");
        }
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      console.error(error);
      alert("¡No hay personajes con este ID!");
    }
  };

  // Login
  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, navigate]);

  const login = async (userData: UserDataApp) => {
    try {
      const { username, password } = userData;
      const data = await loginUser(username, password);

      setAccess(data.access);

      if (data.access) {
        setProfileImage("/path/to/profile-image.jpg"); // Ruta de la imagen del perfil
        navigate("/");
      }
    } catch (error) {
      console.log("Error en la solicitud: ", error);
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="fixed w-full h-full z-0">
        <video
          ref={playerRef}
          src={video}
          loop
          muted
          className="object-cover absolute bottom-0 w-full h-screen"
        />
      </div>

      {!showLoginForm ? (
        <div className="flex flex-col h-full w-full items-center pt-[215px]">
          <NavBar
            onSearch={onSearch}
            characters={characters}
            setActiveView={setActiveView}
            onLoginClick={() => setShowLoginForm(true)}
            profileImage={profileImage} // Pasar la imagen de perfil
          />
          {activeView === "home" && (
            <Cards characters={characters} onClose={onClose} />
          )}
          {activeView === "favorites" && <Favorites />}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Form login={login} />
          <button
            onClick={() => setShowLoginForm(false)}
            className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Volver al Inicio
          </button>
        </div>
      )}
    </div>
  );
}

export default App;