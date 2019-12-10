import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {addPrice} from "../../actions/prices";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        marginTop: '70px',
        marginBottom: '70px'
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

function AddPriceForm(props) {

    const classes = useStyles();

    const [price, setPrice] = React.useState();
    const [date, setDate] = React.useState();

    const disabled = !(price && date);


    const onSubmit = e => {
        e.preventDefault();
        props.addPrice(date, price);
    };
    const onChangePrice = e => {
        const {target: {name, value}} = e;
        setPrice(value);
    };
    const onChangeDate = e => {
        const {target: {name, value}} = e;
        setDate(value);
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
                    name="date"
                    label="data"
                    type="date"
                    defaultValue={date}
                    onChange={onChangeDate}
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    className={classes.submit}
                    onClick={onSubmit}
                >
                    Dodaj cenę
                </Button>
            </form>
        </Paper>
    );
}

AddPriceForm.propTypes = {
    auth: PropTypes.object.isRequired,
    addPrice: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addPrice})(AddPriceForm);
