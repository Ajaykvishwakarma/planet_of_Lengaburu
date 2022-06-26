import { useEffect } from "react";
import { useState} from "react";
const axios = require("axios");

axios.defaults.baseURL = "https://findfalcone.herokuapp.com"

export const Axios = (usedParams) =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")


    useEffect(() => {

        const fetchData = async (params) => {
            try{
                const res = await axios.request(params);
                setData(res.data)
                setLoading(false);
            } catch (err) {
                setError(err)
                setLoading(false);
            }
        }
        fetchData(usedParams)

    }, [])

    return {
        data,
        error, 
        loading
    }

}