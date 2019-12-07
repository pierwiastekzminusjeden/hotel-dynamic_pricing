import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import ReservationForm from './ReservationForm';
import Room from "./Room";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({

    element: {
        margin: '20px',
    },

    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        // overflow: 'hidden',
        // position: 'relative',
        marginTop: '40px',

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

export default function SearchResult() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box display="flex" flexDirection='row' className={classes.leftCol}>
                <Box display='fles' flexDirection='column'>
                    <Card className={classes.element}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="pokój"/>
                        <CardContent>Room Info </CardContent>

                    </Card>
                    <Card className={classes.element}>
                        Total price
                    </Card>
                </Box>
                {/*TODO map z result cenowy i boxy dla każdego z większym marginem */}
                 <Box display="flex"  className={classes.rightCol}>
                <Card className={classes.element}>
                    cena 1
                </Card>
                <Card className={classes.element}>
                    cena 2
                </Card>
                 </Box>
            </Box>
        </Paper>
        //
        // <div className={classes.root}>
        //     <Paper className={classes.leftCol}>
        //         <Room/>
        //         <Room/>
        //     </Paper>
        //
        //     <Paper className={classes.rightCol}>
        //         <Typography variant="h4">Selected Rooms</Typography>
        //     </Paper>
        // </div>
    );
}