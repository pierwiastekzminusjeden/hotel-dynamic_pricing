import React from 'react';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Footer from './Footer';
import {HashRouter as Router, Route} from "react-router-dom";
import Login from './Login';
import Home from "./Home";


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

    return (
        <React.Fragment>
            <Router>
                <Header/>
                <Paper className={classes.paper}>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    {/*<Route component={Error404} />*/}

                </Paper>
                {/*<Footer/>*/}
            </Router>
        </React.Fragment>
    );
}

module.hot.accept();
