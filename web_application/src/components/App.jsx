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


const useStyles = makeStyles(theme => ({
    paper: {
        paddingRight: '15%',
        paddingLeft: '15%',
        background: '#F5F6F6',
        height: '100%',
        position: 'relative',
        top: '60px'
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
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/home" component={Home}/>
                        <PrivateRoute exact path="/adminPanel" component={AdminPanel}/>
                        <PrivateRoute path="/changePassword" component={ChangePasswordForm}/>
                    </Switch>
                    {/*<Route component={Error404} />*/}

                </Paper>
                {/*<Footer/>*/}
            </Router>
        </Provider>
    );
}

module.hot.accept();
