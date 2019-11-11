import React from 'react';
import { useState, useEffect } from "react";

import Header from './Header';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Footer from './Footer';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from './Login';
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";

import {Provider} from 'react-redux';
import {loadUser} from "../actions/auth";

import store from "../store";

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
                    {/*<Route exact path="/home" component={Home}/>*/}
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/home" component={Home}/>
                    </Switch>
                    {/*<Route component={Error404} />*/}

                </Paper>
                {/*<Footer/>*/}
            </Router>
        </Provider>
    );
}

module.hot.accept();
