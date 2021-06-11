import React, { Component }from "react";
import Swal from "sweetalert2";
import Categories from "../Categories/Categories";
import axios from "axios";

const initialState = {
    vehicle: '',
    type: '',
    duration: ''

}
class Trip_Charge extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
    }

  
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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


        return(
            <div className="container">
                <h1>Select Your Trip</h1>
                <form onSubmit={this.onSubmit}>

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

export default Trip_Charge;