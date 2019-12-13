import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteRoom, getRooms} from "../../actions/rooms";

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles( theme =>({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: theme.spacing(2, 1, 2, 1),
        margin: theme.spacing(10,20,10,20),
    },
    table: {
        minWidth: 650,
    },
}));

function RoomList(props) {
    const classes = useStyles();
    useEffect(() => {
        props.getRooms();
    }, []);

    return(
        <React.Fragment>
            <Typography variant="h3"> Dodaj nowy pokój</Typography>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Numer pokoju/id</TableCell>
                            <TableCell align="right">Typ pokoju</TableCell>
                            <TableCell align="right">Cena bazowa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rooms.map(room => (
                            <TableRow key={room.name}>
                                <TableCell component="th" scope="row">
                                    {room.room_number}
                                </TableCell>
                                <TableCell align="right">{room.room_type}</TableCell>
                                <TableCell align="right">{room.base_price}</TableCell>
                                <TableCell align="right"><Button disabled={true} onClick ={props.deleteRoom.bind(this, room.room_id)}>Delete</Button></TableCell>
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
    deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    rooms: state.rooms.rooms,
    auth: state.auth
});

export default connect(mapStateToProps, {getRooms, deleteRoom})(RoomList);