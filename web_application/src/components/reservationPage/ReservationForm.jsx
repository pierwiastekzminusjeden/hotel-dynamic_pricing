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


function ReservationForm(props) {
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
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Open form dialog
            </Button>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide email adress to complete reservation ;)
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={onChangeEmail}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Reserve
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
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