import React from 'react';
import { makeStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
}));
const MainLoader = ()=>{
    const classes = useStyles();
    return(
        <Backdrop className={classes.backdrop} open={true} onClick={()=>{}}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default MainLoader;