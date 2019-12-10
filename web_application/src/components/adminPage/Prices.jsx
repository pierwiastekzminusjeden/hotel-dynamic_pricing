import React from 'react';
import AddPriceForm from "./AddPriceForm";
import PricesList from "./PricesList";

// TODO style, margin
export default function Prices() {

    return (
        <React.Fragment>
            <AddPriceForm/>
            <PricesList/>
        </React.Fragment>
    )
}