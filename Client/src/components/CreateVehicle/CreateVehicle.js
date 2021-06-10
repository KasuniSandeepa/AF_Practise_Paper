import axios from "axios";
import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";

const initialState = {
    code: '',
    model: '',
    type: '',
    name: '',
    amount: '',
    categories: [],
    options: [],
    selectedCategories: []
}

class CreateVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount(){
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
                    this.setState({options: data})
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

    onSubmit(e){
        e.preventDefault();
        let vehicle = {
            code: this.state.code,
            model: this.state.model,
            type: this.state.type,
            name: this.state.name,
            amount: this.state.amount,
            categories: this.state.selectedCategories
        }
        console.log("Data to Send ",vehicle);
        axios.post('http://localhost:8087/vehicle/create',vehicle)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Inserted Successfully',
                    text: 'New Vehicle was created!',
                })
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] })
    }

    render() {
        return(
            <div className="container">
                <h1>Add Vehicle</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Code" className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Model" className="form-label">Model</label>
                        <input
                            type="text"
                            className="form-control"
                            id="model"
                            name="model"
                            value={this.state.model}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Type" className="form-label">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="VehicleChargeAmount" className="form-label">Vehicle Charge Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Select Categories" className="form-label">Select Categories</label>
                        <Select
                            options={ this.state.options }
                            onChange={this.onCategorySelect}
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

export default CreateVehicle;