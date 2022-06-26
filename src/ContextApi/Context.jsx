import { createContext } from "react";

import { Axios } from "../Axios/Axios";

export const Context = createContext();

export const ContextProvider = ({ children }) =>{

    const {
        data : vehicles,
        loading : vehicleLoading,
        error : vehicleError
    } = Axios({
        method: "GET",
        url: "/vehicles"
    });

    const {
        data : planets,
        loading : planetLoading,
        error : planetError
    } = Axios({
        method: "GET",
        url: "/planets"
    });

    return (
        <Context.Provider 
        value={{
            vehicles: vehicles,
            planets : planets,
            planetLoading : planetLoading,
            planetError : planetError,
            vehicleLoading : vehicleLoading,
            vehicleError : vehicleError
        }}
        > {children}
        </Context.Provider>
    )

}

