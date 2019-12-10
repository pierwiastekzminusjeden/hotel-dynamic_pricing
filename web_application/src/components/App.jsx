import React, {useEffect} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
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
import Rooms from "./adminPage/Rooms";
import Reservations from "./adminPage/Reservations"
import ErrorSnackbar from "./common/ErrorSnackbar";
import Prices from "./adminPage/Prices";

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
                        <PrivateRoute path="/adminPanel" component={AdminPanel}/>
                        <PrivateRoute path="/admins" component={RegisterAdminForm}/>
                        <Route exact path="/rooms" component={Rooms}/>
                        <Route exact path="/reservations" component={Reservations}/>
                        <Route exact path="/prices" component={Prices}/>
                    </Switch>
            </Router>
        </Provider>
    );
}

module.hot.accept();
