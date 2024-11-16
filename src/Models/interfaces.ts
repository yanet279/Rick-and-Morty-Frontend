import React, { SetStateAction } from "react";

// --------- APP ---------
export interface Character {
	id: number;
	name: string;
	species: string;
	gender: string;
	origin: {
	    name: string;
	};
	status: string;
	image: string;
	// className es opcional
	className?: string;
}

export interface UserDataApp {
	username: string;
	password: string;
}

// --------- CARD -----------
export interface CardProps {
	id: number;
	name: string;
	species: string;
	gender: string;
	image: string;
	origin: string;
	status: string;
	onClose?: (id: number) => void;
	addFavorite: (character: FavoriteCharacter) => void;
	removeFavorite: (id: number) => void;
	myFavorites: FavoriteCharacter[];
	className?: string;
}

export interface FavoriteCharacter {
	id: number;
	name: string;
	species: string;
	gender: string;
	image: string;
	origin: string;
	status: string;
}

// ---------- FAVORITE -----------
export interface Favorite {
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: { name: string; };
    status: string;
    image: string;
}

//----------  FORM  -----------
export interface UserData {
	username: string;
	password: string;
}

export interface Errors {
	username: string;
	password: string;
}

export interface FormProps {
	login: (userData: UserData) => void;
} 


// -------------Register---------------------
export interface UserRegister{
	username: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    profileImage: string | null,
}
export interface ErrorRegister{
	username: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

//---CARDS----
export interface CardsProps {
	characters: Character[];
	onClose: (id: number) => void;
	className?: string;
}

// Props de NavBar
export interface NavBarProps {
    characters: { id: number; name: string; }[];
	onSearch: (id: number) => void; // Cambia a string
	setActiveView: React.Dispatch<SetStateAction<"home" | "favorites">>; // Corrige el tipo aquí
	className?: string;
}

// Interfaz para las props
export interface SearchBarProps {
    onSearch: (id: number) => void; // Cambia a number
}