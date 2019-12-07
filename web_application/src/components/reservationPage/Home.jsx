import React from 'react';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import SearchResult from "./SearchResult";
import ReservationForm from "./ReservationForm";
import RequestAvailableRoomsAndPricesForm from "../reservationPage/RequestAvailableRoomsAndPricesForm";

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
            <RequestAvailableRoomsAndPricesForm/>
            <SearchResult/>
            <ReservationForm/>
        </Paper>
    );
}