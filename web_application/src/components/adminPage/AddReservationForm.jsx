import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {addReservation} from "../../actions/reservations";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        padding: theme.spacing(2, 1, 2, 1),
        margin: theme.spacing(10,20,10,20),
    },

    paper: {
        padding: theme.spacing(3, 1, 2, 1),
        margin: theme.spacing(10,50,10,50),
        position: 'relative'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function AddReservationForm(props) {

    const classes = useStyles();

    const [room_id, setRoom] = React.useState();
    const [from_date, setFromDate] = React.useState();
    const [to_date, setToDate] = React.useState();
    const [price, setPrice] = React.useState();
    const [email, setEmail] = React.useState();
    const disabled = !(room_id && from_date && to_date && price && email);


    const onSubmit = e => {
        e.preventDefault();
        props.addReservation(room_id, email,  from_date, to_date, price);
    };
    const onChangeRoom = e => {
        const {target: {name, value}} = e;
        setRoom(value);
    };
    const onChangeFromDate = e => {
        const {target: {name, value}} = e;
        setFromDate(value);
    };
    const onChangeToDate = e => {
        const {target: {name, value}} = e;
        setToDate(value);
    };

    const onChangePrice = e => {
        const {target: {name, value}} = e;
        setPrice(value);
    };

    const onChangeEmail = e => {
        const {target: {name, value}} = e;
        setEmail(value);
    };
  

    return (
        <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.text}>Add new reservation</Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="room_id"
                    label="room id"
                    type="number"
                    defaultValue={room_id}
                    autoFocus
                    onChange={onChangeRoom}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="price"
                    type="number"
                    defaultValue={price}
                    autoFocus
                    onChange={onChangePrice}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    type="text"
                    defaultValue={email}
                    autoFocus
                    onChange={onChangeEmail}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="from_date"
                    label="from date"
                    type="date"
                    defaultValue={from_date}
                    onChange={onChangeFromDate}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="to_date"
                    label="to date"
                    type="date"
                    defaultValue={to_date}
                    onChange={onChangeToDate}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    className={classes.submit}
                    onClick={onSubmit}
                >
                    Add room
                </Button>
            </form>
        </Paper>
    );
}

AddReservationForm.propTypes = {
    auth: PropTypes.object.isRequired,
    addReservation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addReservation})(AddReservationForm);
