import React from 'react';
import ChangePasswordForm from "../common/ChangePasswordForm";
import RoomServiceIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Route from "react-router-dom/es/Route";


export default function AdminPanel(props) {
    return(
        <div>
             <Route path="changePassword" component={ChangePasswordForm}/>
        </div>
    );
}