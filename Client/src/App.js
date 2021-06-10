import './App.css';
import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Categories from './components/Categories/Categories';
import Vehicles from "./components/Vehicles/Vehicles";
import Vehicle from "./components/Categories/Vehicle";
import CreateCategory from './components/CreateCategory/CreateCategory';
import CreateVehicle from './components/CreateVehicle/CreateVehicle';
import TripCharge from './components/TripCharge/TripCharge';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App(){
    return(
        <div>
            <Router>
                <Navbar/>
                <section>
                    <Switch>
                        <Route path="/create-category" component={CreateCategory}/>
                        <Route path="/create-vehicle" component={CreateVehicle}/>
                        <Route path="/" component={Categories} exact />
                        <Route path="/vehicles" component={Vehicles} exact />
                        <Route path="/trip-charge" component={TripCharge} />
                        <Route path="/:id" component={Vehicle} />

                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export  default App;