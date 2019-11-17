import React from 'react';
import Card from "@material-ui/core/Card";
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
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
    const addAdminLink = props => <Link to="/addAdmin" {...props} />;
    const addRoomLink = props => <Link to="/addRoom" {...props} />;

    return (
        <Card className={classes.card}>
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                    <ListItem button key={'Add new admin'} component = {addAdminLink}>
                        <ListItemIcon><PersonAddIcon/></ListItemIcon>
                        <ListItemText primary={'Add new admin'}/>
                    </ListItem>
                    <ListItem button key={'Add new room'} component = {addRoomLink}>
                        <ListItemIcon><HotelIcon/></ListItemIcon>
                        <ListItemText primary={'Add new room'}/>
                    </ListItem>
                <List>
                </List>
                {/*<List>*/}
                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                        {/*<ListItem button key={text}>*/}
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                            {/*<ListItemText primary={text}/>*/}
                        {/*</ListItem>*/}
                    {/*))}*/}
                {/*</List>*/}
                {/*<Divider/>*/}
                {/*<List>*/}
                    {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                        {/*<ListItem button key={text}>*/}
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                            {/*<ListItemText primary={text}/>*/}
                        {/*</ListItem>*/}
                    {/*))}*/}
                {/*</List>*/}
            </div>
        </Card>
    );
}