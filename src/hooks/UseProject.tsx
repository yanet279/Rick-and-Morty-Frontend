import { useContext } from "react";
import Context, { ContextProps } from "../context/Provider";

const UseProject = (): ContextProps => {
    const context = useContext(Context);
    if (!context) { throw new Error("useProject debe ser usado dentro de un Provider."); }
    return context;
};

export default UseProject;
