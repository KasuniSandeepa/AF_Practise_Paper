import axios from "axios";
import React, { Component }from "react";

const initialState = {
    vehicles: [],
    duration: 0,
    cost: 0,
    category: '',
    categoryAmount: '',
    selectedVehicle: '',
    x: 0,
}

class Vehicle extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/category/getVehicles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ vehicles: response.data.data})
            })
            .catch(error => {
                alert(error.message)
            })

        axios.get(`http://localhost:8087/category/getCategory/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ categoryAmount: response.data.data.amount})
                this.setState({ category: response.data.data.name})
                console.log(this.state.categoryAmount)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    calculateTotal(e,name , amount) {
        e.preventDefault();
        let calc = {
            duration: this.state.duration,
            categoryAmount: this.state.categoryAmount,
            amount: `${amount}`
        };
        console.log('DATA TO SEND', calc)
        axios.post('http://localhost:8087/category/calculateTripCharge', calc)
            .then(response => {
                this.setState({ cost: response.data.cost });
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return(
            <div className="container">
                <h1>Vehicle for Category - {this.state.category}</h1>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Vehicle Code: {item.code}</h4>
                            <h5>Model: {item.model}</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Name: {item.name}</h5>
                            <h5>Cost: {item.amount}</h5>

                            <div className="mb-3">
                                <label htmlFor="Duration" className="form-label">Duration (Enter Duration in hours)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="duration"
                                    name="duration"
                                    value={this.state.duration}
                                    onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={e => this.calculateTotal(e,item.name , item.amount)}>Calculate</button>
                            <h4>Total Charge - Rs.{this.state.cost}</h4>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Vehicle;