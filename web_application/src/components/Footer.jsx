import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  footer: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    height: '55px',
    background: '#F5F6F6',
    borderTop: 'groove',
    borderColor: 'black',
    borderWidth:'1px',
    color: 'black',
    position: 'sticky',
    bottom: '0px',
  }
}));

export default function Footer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handlemouseover = ()=> {
        if(open == false)
            setOpen(true);
        else
            setOpen(false);
    }

  return (
    <footer onMouseEnter={handlemouseover} onMouseLeave = {handlemouseover} className={classes.footer}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          To jest futer
        </Typography>
        <Typography component="p">
          @2019 All right reserved
        </Typography>
      </Paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
