import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';
import ReservationForm from './ReservationForm';

import Paper from '@material-ui/core/Paper';
import AdminMenu from './AdminMenu';
import {Route} from 'react-router-dom';

export const drawerWidth = '500px';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        background: '#F5F6F6',
        height: '100%',
        borderRight: 'groove',
        borderColor: 'black',
        borderWidth: '1px',
        borderBottomRightRadius: '10px',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        width: drawerWidth,
    },

    card: {
        textAlign: 'center',
        margin: '25px',
        marginTop: '5px',
        backgroud: 'black'

    },


//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },

//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },

//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
}));

export default function SideMenue(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Paper className={classes.paper}>
                    <Route path="/home" component={ReservationForm}/>
                    <Route path="/adminPanel" component={AdminMenu}/>
                </Paper>
            </Drawer>
        </React.Fragment>
    );
}