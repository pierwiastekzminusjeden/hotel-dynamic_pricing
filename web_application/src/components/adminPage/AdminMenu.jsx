import React from 'react';
import Card from "@material-ui/core/Card";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from "@material-ui/core/styles/makeStyles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HotelIcon from '@material-ui/icons/Hotel';
import {Link} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}));

export default function AdminMenu(props) {
    const classes = useStyles();
    const adminsLink = props => <Link to="/admins" {...props} />;
    const roomsLink = props => <Link to="/rooms" {...props} />;
    const reservationsLink = props => <Link to="/reservations" {...props} />;
    const pricesLink = props => <Link to="/prices" {...props} />;

    return (
        <Card className={classes.card}>
            <div className={classes.toolbar}/>
            <Divider/>
            <ListItem button key={'Dodaj administratora'} component={adminsLink}>
                <ListItemIcon><PersonAddIcon/></ListItemIcon>
                <ListItemText primary={'Dodaj administratora'}/>
            </ListItem>
            <ListItem button key={'Pokoje'} component={roomsLink}>
                <ListItemIcon><HotelIcon/></ListItemIcon>
                <ListItemText primary={'Pokoje'}/>
            </ListItem>
            <ListItem button key={'rezerwacje'} component={reservationsLink}>
                <ListItemIcon><HotelIcon/></ListItemIcon>
                <ListItemText primary={'Rezerwacje'}/>
            </ListItem>
            <ListItem button key={'Wyceny'} component={pricesLink}>
                <ListItemIcon><HotelIcon/></ListItemIcon>
                <ListItemText primary={'Wyceny'}/>
            </ListItem>
            {/*<ListItem button key={'Optymalizator cenowy'} component={}>*/}
                {/*<ListItemIcon><HotelIcon/></ListItemIcon>*/}
                {/*<ListItemText primary={'Optymalizator cenowy'}/>*/}
            {/*</ListItem>*/}
        </Card>
    );
}