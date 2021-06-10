import axios from "axios";
import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";

class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8087/vehicle/')
            .then(response => {
                this.setState({ vehicles: response.data.data })
                console.log(response.data.data)

            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    render() {
        return(
            <div className="container">
                <h1>Categories</h1>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item,index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <h4>Vehicle Code: {item.code}</h4>
                            <h5>Model: {item.model}</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Name: {item.name}</h5>
                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

export default Vehicles;