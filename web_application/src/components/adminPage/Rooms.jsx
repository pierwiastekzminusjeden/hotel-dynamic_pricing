import React from 'react';
import AddRoomForm from "./AddRoomForm";
import RoomList from "./RoomList";

// TODO style, margin
export default function Rooms() {

    return (
        <React.Fragment>
            <AddRoomForm/>
            <RoomList/>
        </React.Fragment>
    )
}