import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { useNavigate  } from 'react-router-dom';
import useAuth from 'src/utils/auth';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
const DashboardRedirector = ()=>{
    const classes = useStyles();
    const { logout } = useAuth();
    const navigate = useNavigate();
    return(
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    You have already logged into the application.
                </Typography>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{ navigate('/app/dashboard') }}
                >
                    Move to Dashboard
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color= 'secondary'
                    // className={classes.submit}
                    onClick={()=>{ 
                        logout();
                    }}
                >
                    Logout
                </Button>
            </div>
        </Container>
    )
}
export default DashboardRedirector;