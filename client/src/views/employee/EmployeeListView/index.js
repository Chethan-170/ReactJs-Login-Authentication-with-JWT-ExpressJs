import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie"
import http from 'src/utils/http';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EmployeeListView = () => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const getAllEmployees = async ()=>{
        const jwtToken = Cookies.get("auth_key")
        try{
            let { data } = await http.post("/employee/getAll", { operation:'getallemployees', jwtToken });
            if(data.ok == 0) {
                console.log(data.result);
                setEmployees(data.result);
            }else{
                if(data.error.name === 'JWT_TOKEN_ERROR'){
                    window.location.reload();
                }else throw data.error.name;
            }
        }catch(err){
            setEmployees([]);
            console.log('Error :', err);
        }
    }
    useEffect(()=>{
        getAllEmployees();
    }, []);

    return (
        <Page
            className={classes.root}
            title="Employees"
        >
            <Container maxWidth={false}>
            <Toolbar />
            <Box mt={3}>
                <Results employees={employees} />
            </Box>
            </Container>
        </Page>
    );
};

export default EmployeeListView;
