import React from 'react';
import Slider from 'react-animated-slider';
import Paper from '@material-ui/core/Paper';
import 'react-animated-slider/build/horizontal.css';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const content = [
    {
        title: "turu",
        description: "turu",
        image: 'https://source.unsplash.com/random'
    },
    {
        title: "turu1",
        description: "turu1",
        image: 'https://source.unsplash.com/random'
    },
    {
        title: "turu2",
        description: "turu2",
        image: 'https://source.unsplash.com/random'
    },

];

const useStyle = makeStyles(theme => ({

    paper: {
        padding: '20px',
        marginBottom: '10px',
        position: 'relative'
    },
    text: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '20px',
        width: '100%',
        position: 'absolute',
        bottom: '0px',
    }
}));

export default function Carousel(props) {

    const classes = useStyle();

    return (
        <Paper className={classes.paper}>
            <Slider autoplay={3000}>
                {content.map((item, index) => (
                    <div key={index} style={{background: `url('${item.image}') no-repeat center center`}}>
                        <div className={classes.text}>
                            <Typography variant="h4">{item.title}</Typography>
                            {/* <button>{item.button}</button> */}
                        </div>
                    </div>
                ))}
            </Slider>
        </Paper>
    )
}