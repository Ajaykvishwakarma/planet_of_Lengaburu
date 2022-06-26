import { Context } from "../ContextApi/Context";
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { Planet } from "../Components/Planet/Planet";
import { Vehicle } from "../Components/Vehicle/Vehicle";

export const Home = () => {

    const dataContext = useContext(Context);

    const [ remainingPlanet, setRemainingPlanet] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [remainingVehicle, setRemainingVehicle] = useState(null);

    const { planets, vehicles, planetsLoading, vehiclesLoading } = dataContext;

    const [selectedDetails, setSelectedDetails] = useState();

    const SelectionDetails = () => {
        const makeDetails = [...Array(4).keys()].map((index) => ({
            id: "planet" + index,
            isSelected: false,
            selectedPlanet: "planet",
            selectedVehicle : "",
            eligibleVehicles : [],
            distance : null,
            timeTaken : 0
        }))
        setSelectedDetails(makeDetails)
    }

    // Set Planet Data 
    useEffect(() => {
       setRemainingPlanet(planets);
       setRemainingVehicle(vehicles);
        SelectionDetails();
        
      }, [planetsLoading, planets, vehiclesLoading, vehicles]);
    

      // Handle planet Selection 

      const handlePlanetSelected = (e) => {
        const selectedPlanetId = e.target.id;
        const selectedPlanetName = e.target.value;
    
        const newSelectedDetails = [...selectedDetails];
        newSelectedDetails.map((el) => {
          if (el.id === selectedPlanetId) {
            el.isSelected = true;
            el.selectedPlanet = selectedPlanetName;
          }
          return "";
        });
    
        const planet = remainingPlanet.filter((planet) => {
          return planet.name === e.target.value;
        })[0];
        setSelectedDetails(newSelectedDetails);
        handleVehicles(planet, selectedPlanetId);
      };
    


      //Hndle Vehicle according to selections

      const handleVehicles = (planet, selectedPlanetId) => {
        const eligibleVehicles = vehicles.filter((el) => {
          return el.max_distance >= planet.distance;
        });
    
        const newSelectedDetails = [...selectedDetails];
        newSelectedDetails.map((el) => {
          if (el.id === selectedPlanetId) {
            el.eligibleVehicles = eligibleVehicles;
          }
          return "";
        });
        setSelectedDetails(newSelectedDetails);
      };
    

      //Hndle Vehicle according to selections

      const handleVehicleSelected = (e) => {
        const newSelectedDetails = [...selectedDetails];
        newSelectedDetails.map((el) => {
          if (el.id === e.target.id) {
            el.selectedVehicle === ""? handleVehicleNotSelected(e) : handleVehicleAlreadySelected(e);
            el.selectedVehicle = e.target.value;
          }
          return "";
        });
        setSelectedDetails(newSelectedDetails);

        handleTime(e);
      };
    

      const handleVehicleNotSelected = (e) => {
        const newRemainingvehicles = [...remainingVehicle];
        newRemainingvehicles.map((el) => {
          if (e.target.value === el.name) el.total_no -= 1;
          return "";
        });
        setRemainingVehicle(newRemainingvehicles);
      };


    
      const handleVehicleAlreadySelected = (e) => {
        const SelectedDetails = [...selectedDetails];
        const prevVehicle = SelectedDetails.filter((el) => {
          return el.id === e.target.id;
        })[0].selectedVehicle;
    
        const newRemainingVehicles = [...remainingVehicle];
        newRemainingVehicles.map((el) => {
          if (e.target.value === el.name) el.total_no -= 1;
          if (el.name === prevVehicle) el.total_no += 1;
          return "";
        });
        setRemainingVehicle(newRemainingVehicles);
      };
    

      // Handle Total Times


      const handleTime = (e) => {
        const selectedObj = selectedDetails.filter((el) => {
          return el.id === e.target.id;
        });
    
        const planetSelected = selectedObj[0].selectedPlanet;
        const planetObj = planets.filter((el) => {
          return planetSelected === el.name;
        });
    
        const distance = planetObj[0].distance;
        const vehicleObj = remainingVehicle.filter((el) => {
          return el.name === e.target.value;
        });
    
        const speed = vehicleObj[0].speed;
        const time = distance / speed;
        const newSelectedDetails = [...selectedDetails];
        newSelectedDetails.map((el) => {
          if (el.id === e.target.id) el.timeTaken = time;
          return "";
        });
        setSelectedDetails(newSelectedDetails);
        calculateTotalTime();
      };
    
      function calculateTotalTime() {
        const newSelectedDetails = [...selectedDetails];
    
        const totalTime = newSelectedDetails.reduce(
          (totalTime, selectedDetail) =>
            totalTime + (selectedDetail.timeTaken || 0),
          0
        );
    
        setTotalTime(totalTime);
      }


    return (
        <div >
        <div style={{marginTop:"30px", marginBottom:"30px"}}>
         * Please Select any 4 Planets and Vehicles you want to search *
        </div>
        <div style={{display:"flex", width:"60%", height:"300px", margin:"auto", border: "1px solid green"}}>
          
           { selectedDetails?.map((el) => (
           
                <div key={el.id} >
                  <Planet
                    id={el.id}
                    planets={remainingPlanet}
                    selectedPlanet={el.selectedPlanet}
                    handlePlanet={handlePlanetSelected}
                  />
                  {el.isSelected ? (
                    <Vehicle
                      vehicleCount={remainingVehicle}
                      planetDetails={el}
                      handleVehicleSelected={handleVehicleSelected}
                    />
                  ) : null}
                </div>
              )
            )}
        
        </div>
        <div>
          <div>Time Taken: {totalTime}</div>
        </div>
        <div>
          <Link to="/answer" >
            <button >
              SEARCH QUEEN
            </button>
          </Link>
        </div>
      </div>
    );
    
}