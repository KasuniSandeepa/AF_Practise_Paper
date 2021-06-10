import axios from "axios";
import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";

const initialState = {
    name: '',
    amount: '',
    vehicles: [],
    options: [],
    selectedVehicles: []
}
class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onVehicleSelect = this.onVehicleSelect.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8087/vehicle/')
            .then(response => {
                this.setState({ vehicles: response.data.data },() => {
                    let data = [];
                    this.state.vehicles.map((item, index) => {
                        let vehicle = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(vehicle)
                    });
                    this.setState({options: data})
                })
                console.log(this.state.vehicles)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    onSubmit(e){
        e.preventDefault();
        let category = {
            name: this.state.name,
            amount: this.state.amount,
            vehicles: this.state.selectedVehicles
        };
        console.log("Data to Send ",category);
        axios.post('http://localhost:8087/category/create',category)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Inserted Successfully',
                    text: 'New Category was created!',
                })
            })
            .catch(error => {
                console.log(error.message)

                Swal.fire({
                    icon: 'warning',
                    title: 'Data Inserted Not Successful',
                    text: error.message,
                })
            })


    }

    onVehicleSelect(e) {
        this.setState({ selectedVehicles: e ? e.map(item => item.value) : [] })
        console.log(e);
    }



    render() {
        return(
            <div className="container">
                <h1>Add Category</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Category" className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ChargeAmount" className="form-label">Charge Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Select Vehicles" className="form-label">Select Vehicles</label>
                    <Select
                        options={ this.state.options }
                        onChange={this.onVehicleSelect}
                        className="basic-multi-select"
                        isMulti
                    />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateCategory;