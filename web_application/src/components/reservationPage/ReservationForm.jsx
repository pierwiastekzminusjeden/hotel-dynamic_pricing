import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addReservation} from "../../actions/reservations";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";


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
}));

function ReservationForm(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [clientEmail, setClientEmail] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChangeEmail = (type) => {
        setClientEmail(type.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.pricingData)
        props.addReservation(props.roomId.room_id, clientEmail, '2019-09-01', '2019-09-05', 0, JSON.stringify(props.pricingData));
        setOpen(false);
    };

    return (
        <Paper className = {classes.root}>
            <Card >
                {/*<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>*/}
                <CardContent>
                    {/*<DialogContentText>*/}
                    {/*    Provide email adress to complete reservation ;)*/}
                    {/*</DialogContentText>*/}
                     <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                         <Box>
                             <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={onChangeEmail}
                    /></Box>

                         <Box>
                                <Button onClick={onSubmit} color="primary">
                        Reserve
                    </Button>
                         </Box>
                     </Box>
                </CardContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={onClose} color="primary">*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button onClick={onSubmit} color="primary">*/}
                {/*        Reserve*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Card>
        </Paper>
    );
}


ReservationForm.propTypes = {
    roomId: PropTypes.object.isRequired,
    pricingData: PropTypes.object.isRequired,
    addReservation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    roomId: state.availableRooms.roomId,
    pricingData: state.availableRooms.pricingData
});

export default connect(mapStateToProps, {addReservation})(ReservationForm);