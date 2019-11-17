import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getRooms, deleteRooms} from "../../actions/rooms";
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

function RoomList(props) {
    const classes = useStyles();

    useEffect(() => {
        props.getRooms();
        console.log(props.rooms)
    }, []);

    return(
        <React.Fragment>
            <h2>Rooms</h2>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Room id</TableCell>
                            <TableCell align="right">Room number</TableCell>
                            <TableCell align="right">Room Type</TableCell>
                            <TableCell align="right">base price per night</TableCell>
                            <TableCell align="right">image path</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rooms.map(room => (
                            <TableRow key={room.name}>
                                <TableCell component="th" scope="row">
                                    {room.room_id}
                                </TableCell>
                                <TableCell align="right">{room.room_number}</TableCell>
                                <TableCell align="right">{room.room_type}</TableCell>
                                <TableCell align="right">{room.base_price_per_night}</TableCell>
                                <TableCell align="right">{room.image_path}</TableCell>
                                {/*<TableCell align="right"><Button onClick ={props.deleteRooms.bind(this, room.room_id)} >Delete</Button></TableCell>*/}
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
    rooms: PropTypes.array.isRequired,
    getRooms: PropTypes.func.isRequired,
    deleteRooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    rooms: state.rooms.rooms,
    auth: state.auth
});

export default connect(mapStateToProps, {getRooms, deleteRooms})(RoomList);