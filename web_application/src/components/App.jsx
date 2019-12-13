import React, {useEffect} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';

import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import store from "../store";

import Login from './common/Login';
import Home from "./reservationPage/Home";
import Header from './common/Header';
import ChangePasswordForm from "./common/ChangePasswordForm";
import RegisterAdminForm from "./adminPage/RegisterAdminForm";
import Rooms from "./adminPage/Rooms";
import Reservations from "./adminPage/Reservations"
import ErrorSnackbar from "./common/ErrorSnackbar";
import Prices from "./adminPage/Prices";
import OptimizationPanel from "./adminPage/OptimizationPanel"
import RoomList from "./adminPage/RoomList";
import ReservationList from "./adminPage/ReservationList";
import ReservationForm from "./reservationPage/ReservationForm";
import AddReservationForm from "./adminPage/AddReservationForm";


export default function App(props) {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <ErrorSnackbar/>

            <Router>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute path="/changePassword" component={ChangePasswordForm}/>
                        <PrivateRoute path="/admins" component={RegisterAdminForm}/>
                        <PrivateRoute exact path="/rooms" component={RoomList}/>
                        <PrivateRoute exact path="/reservations" component={AddReservationForm}/>
                        <PrivateRoute exact path="/prices" component={Prices}/>
                        <PrivateRoute exact path="/optimization" component={OptimizationPanel}/>
                    </Switch>
            </Router>
        </Provider>
    );
}

module.hot.accept();
