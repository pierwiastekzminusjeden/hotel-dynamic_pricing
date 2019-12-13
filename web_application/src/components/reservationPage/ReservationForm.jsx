import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addReservation} from "../../actions/reservations";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1, 20, 10, 20),
        padding: theme.spacing(1,50,1,50)
    },
    element: {
        margin: '20px',
    },
    button: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        border: 'dotted',
        borderWidth: '0.5px',
        borderRadius: '5px'
    },
}));

function ReservationForm(props) {
    const classes = useStyles();

    const [clientEmail, setClientEmail] = React.useState(false);
    const disabled = !clientEmail;
    const onChangeEmail = (type) => {
        setClientEmail(type.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        props.addReservation(props.roomId.room_id, clientEmail,
            props.pricingData[0].date, props.pricingData[props.pricingData.length - 1].date, props.pricingData.map(e => e.price).reduce((a, b) => a + b, 0));
    };

    return (
        <Paper className={classes.root}>
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box mr={10} ml={10}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={onChangeEmail}
                    />
                </Box>

                <Box ml={10}>
                    <Button
                        onClick={onSubmit}
                        disabled={disabled}
                        className={classes.button}>
                        Make reservation
                    </Button>
                </Box>
            </Box>
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