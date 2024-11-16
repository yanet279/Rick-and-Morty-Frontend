import React, { useState } from "react";
import validation from "./Validations";
import { UserData, Errors, FormProps } from "../../Models/interfaces";
import { NavLink } from "react-router-dom";

const Form: React.FC<FormProps> = ({ login }) => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<Errors>({
    username: "",
    password: "",
  });

  // Maneja el cambio de los inputs (username y password)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name as keyof UserData;
    const value = event.target.value;

    const updatedUserData = { ...userData, [property]: value };
    setUserData(updatedUserData);
    validation(updatedUserData, errors, setErrors); 
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col absolute z-10 justify-center border-[4px] border-colorBorderForm bg-[#00000033] rounded-2xl px-16 py-12 gap-4">
      <div>
        <div className="flex items-end">
          <label className="text-colorWhite font-bold mr-2" htmlFor="username">Username:</label>
          <input className="rounded-xl h-6 px-2 py-3.5 outline-none" type="text" name="username" value={userData.username}  onChange={handleInputChange} />
        </div>
        <p className="text-white">{errors.username}</p>
      </div>
      <div>
        <div className="flex items-end">
          <label className="text-colorWhite font-bold mr-2" htmlFor="password">Password:</label>
          <input className="rounded-xl h-6 px-2 py-3.5 outline-none" type="password" name="password" value={userData.password} onChange={handleInputChange}/>
        </div>
        <p className="text-colorWhite">{errors.password}</p>
      </div>
      {/* Botón de envío */}
      <button className="bg-colorButtonLogin rounded-2xl border-[4px] border-black py-2 text-2xl font-bold mt-6">
        Login
      </button>
      <div>
        <NavLink to="/Register" className="text-white">Registrarme</NavLink>
      </div>    
    </form>
  );
};

export default Form;
