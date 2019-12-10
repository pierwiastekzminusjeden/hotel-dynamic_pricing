import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import connect from "react-redux/es/connect/connect";
import {requestAvailableRooms} from "../../actions/availableRooms";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { Field, reduxForm } from 'redux-form';


function Optimize(props) {
    const classes = useStyles();

    const [optimize, setOptimize] = React.useState();
    const [file, setFile] = React.useState();

    const hangleChangeOptimize = e => {
        setOptimize(e.target.checked);
    };


    const handleSubmit = e => {
        e.preventDefault();

    };

    return(
        <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.text}> Add new room</Typography>
            <form className={classes.form}>
                <Field
                    name="demand_file"
                    component="input"
                    type="file"
                />
                <FormControl className={classes.form}>
                    <Checkbox
                        checked={optimize}
                        onChange={hangleChangeOptimize}
                        value="Optymalizuj"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    className={classes.submit}
                    onClick={onSubmit}
                >
                    Optymalizuj ceny
                </Button>
            </form>
        </Paper>
    );
}


Optimize.propTypes = {
    requestAvailableRooms: PropTypes.func.isRequired,
    roomId: PropTypes.object.isRequired,
    pricingData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    roomId: state.availableRooms.roomId,
    pricingData: state.availableRooms.pricingData
});

export default connect(mapStateToProps, {requestAvailableRooms})(Optimize);