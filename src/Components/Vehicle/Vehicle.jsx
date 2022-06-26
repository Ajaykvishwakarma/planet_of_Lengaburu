export const Vehicle = (props) => {


    // console.log(props)
    return (
        <div>
          {props.planetDetails?.eligibleVehicles?.map((el) => (
            <div key={el.name}>
              <input
                disabled={
                  props.vehicleCount.filter((v) => {
                    return v.name === el.name;
                  })[0].total_no === 0 ? true : false
                }
                checked={props.planetDetails.selectedVehicle === el.name}
                id={props.planetDetails.id}
                type="radio"
                name={props.planetDetails.id}
                value={el.name}
                onChange={props.handleVehicleSelected}
              />
              <label>
                <label>{el.name} </label>
                <span>
                  (
                  {
                    props.vehicleCount.filter((v) => {
                      return v.name === el.name;
                    })[0].total_no
                  }
                  )
                </span>
              </label>
            </div>
          ))}
        </div>
      );
}