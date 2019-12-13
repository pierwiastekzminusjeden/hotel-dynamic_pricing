import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({

    root: {
        margin: theme.spacing(1,20,1,20),
        backgroundColor: theme.palette.background.paper,
    },

    element: {
        margin: '20px',
    },

    leftCol: {
        textAlign: 'center',
        position: 'flex',
        left: '0px',
    },

    rightCol: {
        position: 'flex',
        width: '100%'
    },
}));

function SearchResult(props) {
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
                            title={"Pokój nr " + props.roomId.room_number}/>
                        <CardContent></CardContent>

                    </Card>
                    <Card className={classes.element}>
                        {/*TODO typography and style*/}
                        {props.pricingData.map(e => e.price).reduce((a,b) => a + b, 0)} zł
                    </Card>
                </Box>
                {/*TODO map z result cenowy i boxy dla każdego z większym marginem */}
                 <Box display="flex"  className={classes.rightCol}>
                     {props.pricingData.map(e => {  return(<Card className={classes.element}>
                         {'Data: ' +  e.date +'\n' + 'Cena: ' + e.price}
                     </Card>)})}
                 </Box>
            </Box>
        </Paper>
    );
}

SearchResult.propTypes = {
    roomId: PropTypes.object.isRequired,
    pricingData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    roomId: state.availableRooms.roomId,
    pricingData: state.availableRooms.pricingData
});

export default connect(mapStateToProps, {})(SearchResult);