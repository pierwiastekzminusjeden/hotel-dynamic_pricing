import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Card from "@material-ui/core/Card/Card";
import {addRoom} from "../../actions/rooms";


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

const roomTypes = [
    {'SINGLE': 'Single room'},
    'Double standard room',
    'Triple room',
    'Double room with kings bed'
];

function AddRoomForm(props) {

    const classes = useStyles();
    const [room_number, setRoom_number] = React.useState();
    const [room_type, setRoom_type] = React.useState();
    const [base_price_per_night, setBase_price_per_night] = React.useState();
    const [image_path, setImage_path] = React.useState();
    const disabled = !(room_number && room_type && base_price_per_night);

    const onSubmit = e => {
        e.preventDefault();
        props.addRoom(room_number, room_type, base_price_per_night, image_path);
    };

    const onChangeRoomNumber = e => {
        const {target: {name, value}} = e;
        setRoom_number(value);
    };
    const onChangeRoomType = e => {
        const {target: {name, value}} = e;
        setRoom_type(value);
    };

    const onChangeBasePrice = e => {
        const {target: {name, value}} = e;
        setBase_price_per_night(value);
    };
    const onChangeImagePath = e => {
        const {target: {name, value}} = e;
        setImage_path(value);
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.text}> Add new room</Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="roomNumber"
                    label="room number"
                    type="number"
                    defaultValue={room_number}
                    autoFocus
                    onChange={onChangeRoomNumber}
                />
                <FormControl className={classes.form}>
                    <Select
                        label = "room type"
                        defaultValue={roomTypes[1]}
                        onChange={onChangeRoomType}
                        input={<Input/>}
                    >
                        {roomTypes.map(name => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="basePrice"
                    label="base price"
                    type="number"
                    defaultValue={base_price_per_night}
                    onChange={onChangeBasePrice}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="imagePath"
                    label="image path"
                    type="path"
                    defaultValue={image_path}
                    onChange={onChangeImagePath}
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

AddRoomForm.propTypes = {
    auth: PropTypes.object.isRequired,
    addRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addRoom})(AddRoomForm);
