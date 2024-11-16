import React, { useState } from "react";
import { UserRegister, ErrorRegister } from "../../Models/interfaces";

const Register: React.FC = () => {
  const defaultProfileImage = "/path/to/default/profile/image.jpg"; // Cambiar por la ruta de tu imagen por defecto

  const [userData, setUserData] = useState<UserRegister>({
    username: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState<ErrorRegister>({
    username: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function validation(
    userData: UserRegister,
    currentErrors: ErrorRegister,
    setErrors: React.Dispatch<React.SetStateAction<ErrorRegister>>
  ) {
    const newErrors: ErrorRegister = { ...currentErrors };
  
    if (!userData.username.trim()) {
      newErrors.username = "El nombre es requerido.";
    } else {
      newErrors.username = "";
    }
  
    if (!userData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido.";
    } else {
      newErrors.lastName = "";
    }
  
    if (!userData.email.includes("@")) {
      newErrors.email = "Debe ser un correo válido.";
    } else {
      newErrors.email = "";
    }
  
    if (userData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else {
      newErrors.password = "";
    }
  
    setErrors(newErrors);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name as keyof UserRegister;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });

    // Validar campos dependientes de contraseñas
    if (property === "confirmPassword" || property === "password") {
      validatePasswords(userData.password, property === "confirmPassword" ? value : userData.confirmPassword);
    }

    // Validar otros campos
    validation(
      { ...userData, [property]: value },
      errors,
      setErrors
    );  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: password !== confirmPassword ? "Las contraseñas no coinciden" : "",
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setUserData({ ...userData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userToRegister = {
      ...userData,
      profileImage: userData.profileImage || defaultProfileImage, // Usar imagen por defecto si no se seleccionó una
    };

    console.log("Datos enviados al servidor:", userToRegister);

  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col absolute z-10 justify-center border-[4px] border-colorBorderForm bg-[#00000033] rounded-2xl px-16 py-12 gap-4"
      >
        {/* Nombre */}
        <div>
          <label className="text-colorWhite font-bold mr-2" htmlFor="username">
            Nombre:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <p className="text-white">{errors.username}</p>
        </div>

        {/* Apellido */}
        <div>
          <label className="text-colorWhite font-bold mr-2" htmlFor="lastName">
            Apellido:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
          <p className="text-white">{errors.lastName}</p>
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="text-colorWhite font-bold mr-2" htmlFor="email">
            Correo electrónico:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <p className="text-white">{errors.email}</p>
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-colorWhite font-bold mr-2" htmlFor="password">
            Contraseña:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <p className="text-colorWhite">{errors.password}</p>
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label className="text-colorWhite font-bold mr-2" htmlFor="confirmPassword">
            Confirmar contraseña:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
          <p className="text-colorWhite">{errors.confirmPassword}</p>
        </div>

        {/* Imagen de Perfil */}
        <div className="flex items-end">
          <label className="text-colorWhite font-bold mr-2" htmlFor="image">
            Foto de perfil:
          </label>
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview ? (
          <div className="mt-2">
            <img src={imagePreview} alt="Imagen Previa" className="w-24 h-24 object-cover rounded-xl" />
          </div>
        ) : (
          <div className="mt-2">
            <img src={defaultProfileImage} alt="Imagen por Defecto" className="w-24 h-24 object-cover rounded-xl" />
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-colorButtonLogin rounded-2xl border-[4px] border-black py-2 text-2xl font-bold mt-6"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Register;