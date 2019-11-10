import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Room from './Room';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
    },
    leftCol: {
        textAlign: 'center',
        position: 'flex',
        left: '0px',
        widht: '70%'
    },
    rightCol: {
        position: 'flex',
        right: '0px',
        width: '30%'
    },

}));

export default function BookingPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.leftCol}>
                <Room/>
                <Room/>
            </Paper>

            <Paper className={classes.rightCol}>
                <Typography variant="h4">Selected Rooms</Typography>
            </Paper>
        </div>
    );
}