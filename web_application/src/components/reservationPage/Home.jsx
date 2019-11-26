import React from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import Carousel from "./Carousel";
import BookingPage from "./BookingPage";
import ReservationForm from "./ReservationForm";

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

export default function Home() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Carousel/>
            <ReservationForm/>
        </Paper>
    );
}