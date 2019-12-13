import React from 'react';
import {Route} from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AdminMenu from '../adminPage/AdminMenu';

import ReservationForm from '../reservationPage/ReservationForm';
import PropTypes from "prop-types";
import {connect} from "react-redux";

export const drawerWidth = '500px';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        height: '100%',
        borderRight: 'groove',
        borderColor: 'black',
        borderWidth: '1px',
        borderBottomRightRadius: '10px',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 40,
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

function SideMenue(props) {
    const classes = useStyles();
    const {isAuthenticated, user} = props.auth;

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
                     { isAuthenticated ? <AdminMenu/> : <React.Fragment/> }
                </Paper>
            </Drawer>
        </React.Fragment>
    );
}


SideMenue.propTypes = {
    auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(SideMenue)