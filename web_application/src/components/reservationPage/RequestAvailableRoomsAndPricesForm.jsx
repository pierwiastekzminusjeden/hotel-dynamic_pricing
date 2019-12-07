import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {requestAvailableRooms} from "../../actions/availableRooms";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";


const roomTypes = [
    {name: 'Single room', value: 'SINGLE'},
    {name: 'Double standard room', value: 'STANDARD'},
    {name: 'Triple room', value: 'TRIPLE'},
    {name: 'Double room with kings bed', value: 'DELUX'}
];
//TODO css, datapickers
const useStyles = makeStyles(theme => ({

    card: {
        display: 'flex',
        alignItems: 'center'
    },

    pickers: {
        display: 'flex',
        textAlign: 'center',
        margin: '5px',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },

    button: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        border: 'dotted',
        borderWidth: '0.5px',
        borderRadius: '5px'
    },

    keyboardPicker: {
        background: '#F5F6F6',
    },
    provider: {
        paddingTop: '10%'
    }
}));


function RequestAvailableRoomsAndPricesForm(props) {
    const classes = useStyles();

    const [selectedInDate, setSelectedInDate] = React.useState();
    const [selectedOutDate, setSelectedOutDate] = React.useState();
    const [selectedRoomType, setSelectedRoomType] = React.useState();

    const onChangeFromDate = type => {
        setSelectedInDate(type.target.value);
    };

    const onChangeToDate = type => {
        setSelectedOutDate(type.target.value);
    };

    const onChangeRoomType = type => {
        setSelectedRoomType(type.target.value);
    };
    const handleSubmit = e => {
        console.log(selectedInDate);
        console.log(selectedOutDate);
        console.log(selectedRoomType);
        e.preventDefault();
        props.requestAvailableRooms(selectedRoomType, selectedInDate, selectedOutDate);

    };

    return (
        <Paper>
        <Card className={classes.card}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">

                        <Box p={5} className={classes.keyboardPicker}>
                            <Typography variant="h6">Date in</Typography>
                            <TextField
                                // disableToolbar="true"
                                // disablePast="true"
                                // openTo="date"
                                type="date"
                                // variant="static"
                                // orientation="landscape"
                                format = "MM-DD-YYYY"
                                // value={selectedInDate}
                                onChange={onChangeFromDate}
                                className={classes.pickers}
                            />
                        </Box>
                        <Box p={5} className={classes.keyboardPicker}>
                            <Typography variant="h6">Date out</Typography>
                            <TextField
                                // disableToolbar="true"
                                // disablePast="true"
                                // openTo="date"
                                // variant="static"
                                // orientation="landscape"
                                type="date"
                                format = "MM-DD-YYYY"
                                // value={selectedOutDate}
                                onChange={onChangeToDate}
                                className={classes.pickers}
                            />
                        </Box>
                        <Box p={5} className={classes.keyboardPicker}>
                            <Typography variant="h6">Room Type</Typography>
                            <FormControl className={classes.form}>
                                <Select
                                    label="room type"
                                    defaultValue={roomTypes[1].value}
                                    onChange={onChangeRoomType}
                                    input={<Input />}
                                >
                                    {roomTypes.map(obj => (
                                        <MenuItem key={obj.value} value={obj.value}>
                                            {obj.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    {/* </MuiPickersUtilsProvider> */}
                    <Button type="submit" className={classes.button}>Send request for available rooms</Button>
                 </Box>
                    </Box>
                    </form>
            </CardContent>
        </Card>
            <Card></Card>
        </Paper>
    );
}


RequestAvailableRoomsAndPricesForm.propTypes = {
    requestAvailableRooms: PropTypes.func.isRequired,
     roomId: PropTypes.object.isRequired,
    pricingData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    roomId: state.availableRooms.roomId,
    pricingData: state.availableRooms.pricingData
});

export default connect(mapStateToProps, {requestAvailableRooms})(RequestAvailableRoomsAndPricesForm);