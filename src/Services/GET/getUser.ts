
import api from '../axios';

export interface LoginResponse {
        access:boolean
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
        const { data } = await api.get<LoginResponse>(`/rickandmorty/login/?email=${username}&password=${password}`);
        return data; 
};