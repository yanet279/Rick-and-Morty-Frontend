import axios from 'axios';
import { Dispatch } from 'redux';
import  {Action, ADD_FAVORITES_ACTION, REMOVE_FAVORITES_ACTION, FILTER_FAVORITES_ACTION, ORDER_FAVORITES_ACTION, RESET_ACTION } from './ActionsTypes';
import { Character } from '../Models/interfaces';
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store"; 

export interface AddFavoriteAction {
    type: typeof ADD_FAVORITES_ACTION;
    payload: Character;
    }
    
    export type FavoriteActionTypes = AddFavoriteAction; 

// Función para añadir un favorito
export const addFavorite = (character: Character): ThunkAction<void, RootState, unknown,  FavoriteActionTypes>  => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return async (dispatch: Dispatch<Action>) => {
        try {
            console.log('character', character)
            await axios.post(endpoint, character);
            
            return dispatch({
                type: ADD_FAVORITES_ACTION,
                payload: character,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

// Función para eliminar un favorito
export const removeFav = (id: number) => {
    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
    return async (dispatch: Dispatch<Action>) => {
        try {
            await axios.delete(endpoint);
            return dispatch({
                type: REMOVE_FAVORITES_ACTION,
                payload: id,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

// Función para filtrar favoritos
export const filterFavorites = (gender: string) => {
    return {
        type: FILTER_FAVORITES_ACTION,
        payload: gender,
    };
};

// Función para ordenar favoritos
export const orderFavorites = (order: 'A' | 'D') => {
    return {
        type: ORDER_FAVORITES_ACTION,
        payload: order,
    };
};

// Función para reiniciar
export const reset = () => {
    return {
        type: RESET_ACTION,
    };
};