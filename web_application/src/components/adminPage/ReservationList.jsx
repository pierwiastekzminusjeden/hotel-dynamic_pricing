import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getReservation, deleteReservation} from "../../actions/reservations";
import store from "../../store";
import {loadUser} from "../../actions/auth";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

function ReservationList(props) {
    const classes = useStyles();
    useEffect(() => {
        props.getReservations();
        console.log(props.rooms)
    }, []);

    return(
        <React.Fragment>
            <h2>Reservations</h2>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>reservation_id</TableCell>
                            <TableCell align="right">room</TableCell>
                            <TableCell align="right">client</TableCell>
                            <TableCell align="right">reservation date</TableCell>
                            <TableCell align="right">from</TableCell>
                            <TableCell align="right">to</TableCell>
                            <TableCell align="right">price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.reservation.map(reservation => (
                            <TableRow key={reservation.name}>
                                <TableCell component="th" scope="row">
                                    {reservation.reservation_id}
                                </TableCell>
                                <TableCell align="right">{reservationoom.room}</TableCell>
                                <TableCell align="right">{reservation.client}</TableCell>
                                <TableCell align="right">{reservation.reservation_date}</TableCell>
                                <TableCell align="right">{reservation.from_date}</TableCell>
                                <TableCell align="right">{reservation.to_date}</TableCell>
                                <TableCell align="right">{reservation.price}</TableCell>
                                <TableCell align="right"><Button onClick ={props.deleteReservation.bind(this, room.reservation_id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            
        </React.Fragment>
    );
}

RoomList.propTypes = {
    auth: PropTypes.object.isRequired,
    reservations: PropTypes.array.isRequired,
    getRooms: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    rooms: state.rooms.rooms,
    auth: state.auth
});

export default connect(mapStateToProps, {getReservations})(ReservationList);