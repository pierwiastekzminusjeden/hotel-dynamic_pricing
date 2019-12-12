import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardContent from "@material-ui/core/CardContent";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {requestAvailableRooms} from "../../actions/availableRooms";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {format} from 'date-fns'
import {GET_ERRORS} from "../../actions/types";
import store from "../../store";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {runOptimize} from "../../actions/optimize";

const roomTypes = [
    {name: 'Jedna osoba', value: 1},
    {name: 'Dwie osoby', value: 2},
    {name: 'Trzy osoby', value: 3},
    {name: 'Cztery osoby', value: 4}
];

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
        width: '100%'
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


function OptimizationPanel(props) {
    const classes = useStyles();

    const [selectedInDate, setSelectedInDate] = React.useState();
    const [selectedOutDate, setSelectedOutDate] = React.useState();
    const [selectedRoomType, setSelectedRoomType] = React.useState();
    const [saveToDb, setSaveToDb] = React.useState();
    let disabled = !(selectedInDate && selectedOutDate && selectedRoomType);

    const onChangeFromDate = e => {
        setSelectedInDate(format(new Date(e), 'yyyy-MM-dd'));
    };

    const onChangeToDate = e => {
        setSelectedOutDate(format(new Date(e), 'yyyy-MM-dd'));
    };

    const onChangeRoomType = e => {
        setSelectedRoomType(e.target.value);
    };
    const onChangeSaveToDb = e => {
        setSaveToDb(e.target.checked);
    };

    const handleSubmit = e => {
        if (selectedInDate > selectedOutDate) {
            const errors = {
                message: 'Data zameldowania musi być wcześniejsza niż data wymeldowania',
                status: -1
            };
            store.dispatch({
                type: GET_ERRORS,
                payload: errors
            });
            setSelectedInDate(format(Date.now(), 'yyyy-MM-dd'));
            setSelectedOutDate(format(Date.now(), 'yyyy-MM-dd'));
        } else {
            e.preventDefault();
            props.runOptimize(selectedInDate, selectedOutDate, selectedRoomType, saveToDb);
        }
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Paper>
                        <Card className={classes.card}>
                            <CardContent>
                                <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                                    <Box p={5}>
                                        <Typography variant="h6">Data początkowa</Typography>
                                        <KeyboardDatePicker
                                            disableToolbar="true"
                                            disablePast="true"
                                            openTo="date"
                                            type="date"
                                            variant="static"
                                            orientation="landscape"
                                            format="MM/dd/yyyy"
                                            value={selectedInDate}
                                            onChange={onChangeFromDate}
                                            className={classes.pickers}
                                        />
                                    </Box>
                                    <Box p={5}>
                                        <Typography variant="h6">Data końcowa</Typography>
                                        <KeyboardDatePicker
                                            disableToolbar="true"
                                            disablePast="true"
                                            openTo="date"
                                            variant="static"
                                            orientation="landscape"
                                            format="MM/dd/yyyy"
                                            type="date"
                                            value={selectedOutDate}
                                            onChange={onChangeToDate}
                                            className={classes.pickers}
                                        />
                                    </Box>
                                    <Box p={5} display="flex" flexDirection="column">
                                        <Box p={5}>
                                            <Typography variant="h6">Przeszukaj dla: </Typography>
                                            <FormControl className={classes.formControl}>
                                                <Select
                                                    label="room type"
                                                    defaultValue={roomTypes[1].value}
                                                    onChange={onChangeRoomType}
                                                    input={<Input/>}
                                                >
                                                    {roomTypes.map(obj => (
                                                        <MenuItem key={obj.value} value={obj.value}>
                                                            {obj.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box p={5}>
                                            <FormControlLabel
                                                control= {
                                                    <Checkbox
                                                checked={saveToDb}
                                                onChange={onChangeSaveToDb}
                                                value="checkedA"
                                                inputProps={{
                                                    'aria-label': 'primary checkbox',
                                                }}
                                                /> }
                                                label="Zapisz wyniki optymalizacji w bazie danych"
                                            />
                                        </Box>
                                        <Box p={5}>
                                            <Button
                                                type="submit"
                                                disabled={disabled}
                                                className={classes.button}>Optymalizuj na podstawie cen konkurencji
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Paper>
                </MuiPickersUtilsProvider>
                <Paper>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                                <Box p={5}>

                                </Box>
                            </Box>
                        </CardContent>

                    </Card>
                </Paper>
            </form>
        </Paper>
    );
}

OptimizationPanel.propTypes = {
    runOptimize: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {runOptimize})(OptimizationPanel);