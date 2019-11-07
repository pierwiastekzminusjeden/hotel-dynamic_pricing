import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import Home from './Home';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import BookingPage from './BookingPage';
// const App = ({ title }) =>
//   <div>hehehe</div>;

const useStyles = makeStyles(theme => ({
  paper: {
    paddingRight: '15%',
    paddingLeft:'15%',
    background: '#F5F6F6',
    height: '100%',
  }
}));



export default function App(props){
  const classes = useStyles();


    return (
      <React.Fragment>
      <Header/>
      <Paper className = {classes.paper}>
        <Carousel/>
        {/* <Home/> */}
        <BookingPage/>

      </Paper>
      <Footer/>
    {/* <PersistentDrawerLeft/> */}
    </React.Fragment>
    );
}

module.hot.accept();
