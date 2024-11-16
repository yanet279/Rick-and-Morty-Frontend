import { AxiosResponse } from 'axios';
import api from '../axios' ; 
import { Character } from '../../Models/interfaces';

export const getCharacterById = async (id: string): Promise<AxiosResponse<Character>> => {
    return api.get<Character>(`/rickandmorty/character/${id}`);
    
};
