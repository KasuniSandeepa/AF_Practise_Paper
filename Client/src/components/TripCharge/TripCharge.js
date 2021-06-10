import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";
import Categories from "../Categories/Categories";
import axios from "axios";

const initialState = {
    vehicle: '',
    type: '',
    vehicles: '',
    categories: '',
    optionsVehicles: [],
    optionsCategories: [],
    selectedVehicle: '',
    selectedCategory: '',
    duration: ''

}
class TripCharge extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onVehicleSelect = this.onVehicleSelect.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);


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
                    this.setState({optionsVehicles: data})
                })
                console.log(this.state.vehicles)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

        axios.get('http://localhost:8087/category/')
            .then(response => {
                this.setState({ categories: response.data.data },() => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({optionsCategories: data})
                })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

   /* onVehicleSelect(e) {

        let x =  e.value;
        this.setState({ selectedVehicle: e.value })

        console.log("Vehicle",this.state.selectedVehicle)
        console.log("Vehicle",e.value)
    }*/

    onVehicleSelect = (VEHICLE) => {
        this.setState({ VEHICLE });
        console.log(`Option selected:`, VEHICLE);
    }

   /* onCategorySelect(e) {
        this.setState({ selectedCategory: e.value })
        console.log("Category",this.state.selectedCategory)
    }*/

    onCategorySelect = (CATEGORY) => {
        this.setState({ CATEGORY });
        console.log(`Option selected:`, CATEGORY);
    }
    onSubmit(e){
        e.preventDefault();
        let charge = {

            duration: this.state.duration
        };
        console.log("Data to Send ",charge);
        axios.post('http://localhost:8087/charge/charge',charge)
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

    render() {

        const { VEHICLE } = this.state.selectedVehicle
        const { CATEGORY } = this.state.selectedCategory
        return(
            <div className="container">
                <h1>Select Your Trip</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Select Category" className="form-label">Select Category</label>
                        <Select
                            options={ this.state.optionsCategories }
                          onChange={this.onCategorySelect}
                            className="basic-single"



                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Select Vehicles" className="form-label">Select Vehicles</label>
                        <Select
                            options={ this.state.optionsVehicles }
                        onChange={this.onVehicleSelect}
                            className="basic-multi-select"




                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Duration" className="form-label">Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChange}/>
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

export default TripCharge;