import { useState, useEffect } from "react"
import style from './Planet.module.css';


export const Planet = (props) => {


    return (
        <div className={style.planet_container}>
            <div>
                <div className={style.head}>
                    <h3>Select Planet</h3>
                </div>
                <div>
                    <select
                    className={style.select_panet}
                    onChange={props.handlePlanet}
                    id={props.id}
                    value={props.selectedPlanet}
                    >
                        <option>Select</option>
                        {props.planets?.map((el) => (
                            <option key={el.name}>{el.name}</option>
                        ))}
                    </select>
                </div>
            </div>

        </div>
    )
}