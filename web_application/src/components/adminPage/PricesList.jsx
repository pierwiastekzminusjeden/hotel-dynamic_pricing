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
import {deletePrice, getPrices} from "../../actions/prices";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

function PricesList(props) {
    const classes = useStyles();
    useEffect(() => {
        props.getPrices();
    }, []);

    return(
        <React.Fragment>
            <h2>Ceny</h2>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell align="right">Cena</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.prices.map(price => (
                            <TableRow key={price.name}>
                                <TableCell component="th" scope="row">{price.date}</TableCell>
                                <TableCell align="right">{price.price}</TableCell>
                                <TableCell align="right"><Button onClick ={props.deletePrice.bind(this, price.date)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            
        </React.Fragment>
    );
}

PricesList.propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    getPrices: PropTypes.func.isRequired,
    deletePrice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    prices: state.prices.prices,
    auth: state.auth
});

export default connect(mapStateToProps, {getPrices, deletePrice})(PricesList);