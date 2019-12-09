import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

import clsx from "clsx";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {logout} from "../../actions/auth";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    text: {
        marginTop: theme.spacing(1),
        marginBottm: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

function UserMenu(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const logoutLink = props.logout;
    const changePassword = props => <Link to="/changePassword" {...props} />;
    const adminPanel = props => <Link to="/adminPanel" {...props} />;
    const {isAuthenticated, user} = props.auth;

    return (
        <div className={classes.root}>
            <Typography className={classes.text}> Logged as {user.username}</Typography>
            <IconButton
                ref={anchorRef}
                color="inherit"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={clsx(classes.menuButton, open)}>
                <AccountCircleIcon/>
            </ IconButton>
            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem component={changePassword}>Change Password</MenuItem>
                                    <MenuItem component={adminPanel}>Admin Panel</MenuItem>
                                    <MenuItem onClick={logoutLink}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

UserMenu.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(UserMenu)