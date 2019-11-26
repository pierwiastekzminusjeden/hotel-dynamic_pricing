import React, { useState, useEffect } from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';

import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import store from "../store";

import Login from './common/Login';
import Home from "./reservationPage/Home";
import Header from './common/Header';
import AdminPanel from "./adminPage/AdminPanel";
import ChangePasswordForm from "./common/ChangePasswordForm";
import RegisterAdminForm from "./adminPage/RegisterAdminForm";
import AddRoomForm from "./adminPage/AddRoomForm";
import RoomList from "./adminPage/RoomList";
import Rooms from "./adminPage/Rooms";
import Reservations from "./adminPage/Reservations"

export default function App(props) {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute path="/changePassword" component={ChangePasswordForm}/>
                        <PrivateRoute path="/adminPanel" component={AdminPanel}/>
                        <PrivateRoute path="/admins" component={RegisterAdminForm}/>
                        <Route exact path="/rooms" component={Rooms}/>
                        <Route exact path="/reservations" component={Reservations}/>
                    </Switch>
            </Router>
        </Provider>
    );
}

module.hot.accept();
