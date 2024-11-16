import {Action, ADD_FAVORITES_ACTION, FILTER_FAVORITES_ACTION, ORDER_FAVORITES_ACTION, REMOVE_FAVORITES_ACTION, RESET_ACTION } from './ActionsTypes';
import { Character } from '../Models/interfaces';

export interface State {
    myFavorites: Character[];
    allCharacters: Character[];
}


const initialState: State = {
    myFavorites: [],
    allCharacters: [], // no se toca, solo add y remove
};

const rootReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ADD_FAVORITES_ACTION: {
            return {
                ...state,
                myFavorites: [...state.myFavorites, action.payload], // Agrega al array existente
                allCharacters: [...state.allCharacters, action.payload], // Mantén todos los personajes
            };
        }

        case REMOVE_FAVORITES_ACTION: {
            const updatedFavorites = state.myFavorites.filter(
                (char) => char.id !== action.payload
            );
            return {
                ...state,
                myFavorites: updatedFavorites,
                allCharacters: state.allCharacters.filter(
                    (char) => char.id !== action.payload
                ),
            };
        }

        case FILTER_FAVORITES_ACTION: {
            const filtradosGenero = state.allCharacters.filter(
                (char) => char.gender === action.payload
            );
            return {
                ...state,
                myFavorites: filtradosGenero,
            };
        }

        case RESET_ACTION: {
            return {
                ...state,
                myFavorites: [...state.allCharacters],
            };
        }

        case ORDER_FAVORITES_ACTION: {
            const favoritosOrdenados = [...state.myFavorites].sort((a, b) => {
                if (action.payload === 'Ascendente') {
                    return a.id - b.id;
                }
                return b.id - a.id;
            });
            return {
                ...state,
                myFavorites: favoritosOrdenados,
            };
        }

        default:
            return state;
    }
};

export default rootReducer;
