import React from 'react';
import AddRoomForm from "./AddRoomForm";
import RoomList from "./RoomList";


export default function Rooms() {

    return (
        <React.Fragment>
            <AddRoomForm/>
            <RoomList/>
        </React.Fragment>
    )
}