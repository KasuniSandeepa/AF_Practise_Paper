import axios from "axios";
import React, { Component }from "react";


class Vehicle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vehicles: []

        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/category/getVehicles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ vehicles: response.data.data })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return(
            <div className="container">
                <h1>Vehicle for Category </h1>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
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

export default Vehicle;