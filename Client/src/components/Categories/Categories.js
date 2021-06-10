import axios from "axios";
import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.navigateVehiclePage = this.navigateVehiclePage.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8087/category/')
            .then(response => {
                this.setState({ categories: response.data.data })
                console.log(response.data.data)

            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    navigateVehiclePage(e, categoryId) {
        window.location = `/${categoryId}`
    }



    render() {
        return(
            <div className="container">
                <h1>Categories</h1>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <div key={index} className="card mb-3" onClick={e => this.navigateVehiclePage(e, item._id)}>
                        <div className="p-3" >
                            <h4>Category: {item.name}</h4>

                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

export default Categories;