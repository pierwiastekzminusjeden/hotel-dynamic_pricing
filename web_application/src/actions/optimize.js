import {getHeader} from "./auth";
import axios from "axios";
import {RUN_OPTIMIZE_SUCCESS, GET_ERRORS} from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const runOptimize = (from_date, to_date, number_of_guests, optimize_to_db) => (dispatch, getState) => {
    const config = getHeader(getState);

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    const body = JSON.stringify({from_date, to_date, number_of_guests});
    console.log(body);
    axios.post('http://localhost:8000/api/optimize/',body, config)
        .then(res => {
            dispatch({
                type: RUN_OPTIMIZE_SUCCESS,
                payload: res.data
            });
        }).catch(err =>{
        const errors = {
            message: err.response.data,
            status: err.response.status
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })};
