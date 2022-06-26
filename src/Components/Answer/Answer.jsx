import { useState, useEffect, useCallback } from 'react';
import style from "./Answer.module.css";
import { Axios } from '../../Axios/Axios';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const axios = require("axios");
export const Answer = () => {

    const [token, setToken] = useState("");
    const [result, setResult] = useState("");
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("")

    const navigate = useNavigate();

    const state = useLocation().state;

    const { res, error } = Axios({
        method : "POST",
        url : "/token",
        headers : {
            Accept : "application/json",
        },
        body: {},
    })

    const foundResult = useCallback(
        async function () {
            await axios({
                method: "POST",
                url: "https://findfalcone.herokuapp.com/find",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json",
                },
                data: {
                    token : token,
                    planet_name : state.selectedPlanet,
                    vehicle_name : state.selectedVehicle,

                }
            }).then((res) => {
                if(res.data.status) {
                    setResult("Success! You found Falcone!")
                    setName(res.data.planet_name)
                } else {
                    setResult("Failed! Sorry Not Able to find Falcone!")
                }
                setStatus(res.data.status)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        },
        [state, token]
    )

    useEffect(() => {
        if(state) {
            if(res !== null && res !== undefined) {
                setToken(res.token)
                foundResult()
            }
        }

    },[state, token, res])

    

    return (
        <div>
            {loading ? (
                    <div className={style.spinner_div}>
                    <Box>
                        <CircularProgress />
                    </Box>
                    </div>
            ) : (
            <div>
            {status ? (
                <div>
                    <div>
                        Fount at : {name}
                    </div>
                    <div>
                        Time Taken: {state.totalTime}
                    </div>
                </div>
                      ) : null}
                <div>
                    <Link to="/">
                    <Button
                    className={style.btn}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Find Again !
                    </Button>
                    </Link>
                </div>
            </div>
            )}
        </div>
    )
}