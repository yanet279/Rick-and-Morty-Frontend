import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define el tipo del contexto
export interface ContextProps {
    scrollY: number;
    setScrollY: Dispatch<SetStateAction<number>>;
    screenHeight: number;
    setScreenHeight: Dispatch<SetStateAction<number>>;
    acumuladorFrame: number;
    setAcumuladorFrame: Dispatch<SetStateAction<number>>;
    loaderForm: boolean;
    setLoaderForm: Dispatch<SetStateAction<boolean>>;
}

// Valor inicial del contexto
const defaultValue: ContextProps = {
    scrollY: 0,
    setScrollY: () => {},
    screenHeight: 0,
    setScreenHeight: () => {},
    acumuladorFrame: 0,
    setAcumuladorFrame: () => {},
    loaderForm: false,
    setLoaderForm: () => {},
};

// Crear el contexto con el valor inicial
const Context = createContext<ContextProps>(defaultValue);

// Define los props del componente Provider
interface ProviderProps {
    children: ReactNode;
}

// Definir el proveedor
const Provider = ({ children }: ProviderProps) => {
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [screenHeight, setScreenHeight] = useState(0);
    const [acumuladorFrame, setAcumuladorFrame] = useState(0);
    const [loaderForm, setLoaderForm] = useState(false);

    return (
        <Context.Provider
        value={{
            scrollY,
            setScrollY,
            screenHeight,
            setScreenHeight,
            acumuladorFrame,
            setAcumuladorFrame,
            loaderForm,
            setLoaderForm,
        }}
        >
        {children}
        </Context.Provider>
    );
};

export { Provider };
export default Context;