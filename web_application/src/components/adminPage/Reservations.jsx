import React from 'react';
import AddReservationForm from "./AddReservationForm";
import ReservationList from "./ReservationList";


export default function Reservations() {

    return (
        <React.Fragment>
            <AddReservationForm/>
             <ReservationList/>
        </React.Fragment>
    )
}