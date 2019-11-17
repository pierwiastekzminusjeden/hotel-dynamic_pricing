import React, { useState, useEffect } from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';

import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import store from "../store";

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import Login from './common/Login';
import Home from "./reservationPage/Home";
import Header from './common/Header';
import AdminPanel from "./adminPage/AdminPanel";
import ChangePasswordForm from "./common/ChangePasswordForm";
import RegisterAdminForm from "./adminPage/RegisterAdminForm";
import AddRoomForm from "./adminPage/AddRoomForm";
import RoomList from "./adminPage/RoomList";
import Rooms from "./adminPage/Rooms";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(10,20,10,20),
        background: '#F5F6F6',
        position: 'absolute',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px'
    }
}));

export default function App(props) {
    const classes = useStyles();

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Paper className={classes.paper}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute path="/changePassword" component={ChangePasswordForm}/>
                        <PrivateRoute path="/adminPanel" component={AdminPanel}/>
                        <PrivateRoute path="/addAdmin" component={RegisterAdminForm}/>
                        <Route exact path="/addRoom" component={Rooms}/>
                    </Switch>
                </Paper>
            </Router>
        </Provider>
    );
}

module.hot.accept();
