import React from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import SearchResult from "./SearchResult";
import ReservationForm from "./ReservationForm";
import RequestAvailableRoomsAndPricesForm from "../reservationPage/RequestAvailableRoomsAndPricesForm";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(10,20,10,20),
        background: '#F5F6F6',
        position: 'absolute',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px'
    }
}));

function Home(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <RequestAvailableRoomsAndPricesForm/>
            {props.roomId && props.pricingData ? <React.Fragment> <SearchResult/> <ReservationForm/> </React.Fragment> : <React.Fragment/>}
        </Paper>
    );
}

Home.propTypes = {
    roomId: PropTypes.object.isRequired,
    pricingData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    roomId: state.availableRooms.roomId,
    pricingData: state.availableRooms.pricingData
});

export default connect(mapStateToProps, {})(Home);