import React from 'react';
import Carousel from "./Carousel";
import BookingPage from "./BookingPage";


export default function Home() {

    return (
        <React.Fragment>
            <Carousel/>
            <BookingPage/>
        </React.Fragment>
    );
}