import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import useAuth from 'src/utils/auth';
import LoginRedirector from 'src/views/redirector/LoginRedirector';
import MainLoader from '../Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const { isLoggedIn, isValidating } = useAuth();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    (isValidating)
    ? <MainLoader />
    :
      (isLoggedIn())
      ?
        <div className={classes.root}>
          <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      : <LoginRedirector />
  );
};

export default DashboardLayout;
