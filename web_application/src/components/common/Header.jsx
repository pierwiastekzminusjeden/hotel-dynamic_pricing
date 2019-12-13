import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SideMenue, {drawerWidth} from './SideMenue';
import UserMenu from "./UserMenu";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    appBar: {
        background: 'purple',
        margin: '0px',
        borderBottom: 'groove',
        borderColor: 'black',
        borderWidth: '1px',
        color: 'black'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: 'purple',
        borderBottom: 'groove',
        borderColor: 'black',
        borderWidth: '1px',
        color: 'black'
    },
}));

function Header(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {isAuthenticated, user} = props.auth;

    const loginLink = props => <Link to="/login" {...props} />;

    const authLinks = <UserMenu/>;
    const guestLinks =  <Button component={loginLink} color="inherit" >Login</Button>;

    const handleDrawer = () => {
        if (open) {
            setOpen(false);
        } else if (!open) {
            setOpen(true);
        }
    };

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    {isAuthenticated ? <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawer}
                        className={clsx(classes.menuButton, open)}>
\                        <MenuIcon/>
                    </IconButton> :  <React.Fragment/>}
                    <Typography variant="h6" className={classes.title}>HOTEL</Typography>
                   { isAuthenticated ? authLinks : guestLinks }
                </Toolbar>
            </AppBar>
            <SideMenue open={open}/>
        </React.Fragment>
    );
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Header)