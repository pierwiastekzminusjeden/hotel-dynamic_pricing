import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';

import {
    DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  
  pickers: {
    display: 'flex',
    textAlign: 'center',
    margin: '5px',
    width: '20px'
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
      paddingTop:'10%'
  }
}));


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];


export default function ReservationForm(props) {
    const classes = useStyles();
    const [selectedInDate, setSelectedInDate] = React.useState();
    const [selectedOutDate, setSelectedOutDate] = React.useState();
    const [selectedRoomType, setSelectedRoomType] = React.useState();


    const handleInDateChange = date => {
        setSelectedInDate(date);
    };

    const handleOutDateChange = date => {
        setSelectedOutDate(date);
    };

    const handleRoomTypeChange = type => {
        setSelectedRoomType(type.target.value);
    };
    const handleSubmit = event => {
      console.log(selectedInDate);
      console.log(selectedOutDate);
      console.log(selectedRoomType)
      event.preventDefault();
   };

    return (
          <form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <Grid container justify="space-around" direction="row"> */}
                    <Card className={classes.keyboardPicker}>
                        <Typography variant="h6">Date in</Typography>
                        <DatePicker
                            disableToolbar="true"
                            disablePast="true"
                            openTo="date"
                            variant="static"
                            orientation="landscape"
                            format="MM/dd/yyyy"
                            value={selectedInDate}
                            onChange={handleInDateChange}
                            className = {classes.pickers}
                        />
                    </Card>
                    <Card className={classes.keyboardPicker}>
                        <Typography variant="h6">Date out</Typography>
                        <DatePicker
                            disableToolbar="true"
                            disablePast="true"
                            openTo="date"
                            variant="static"
                            orientation="landscape"
                            format="MM/dd/yyyy"
                            value={selectedOutDate}
                            onChange={handleOutDateChange}
                            className = {classes.pickers}
                        />
                    </Card>
                    <Card className={classes.keyboardPicker}>
                        <Typography variant="h6">Room Type</Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                                        <Select
                                        value={selectedRoomType}
                                        onChange={handleRoomTypeChange}
                                        input={<Input />}
                                        >
                                        {names.map(name => (
                                        <MenuItem key={name} value={name}>
                                        {name}
                                        </MenuItem>
          ))}
        </Select>
      </FormControl>
                    </Card>
            </MuiPickersUtilsProvider>
            <Button  type="submit" className={classes.button}>Send request for available rooms</Button>
            </form>
    );
}