import React, { useState } from 'react'
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from '../MainPage-Components/HomeNavbar';

toast.configure();

const initialvalue = {
    email: "",
    password: ""
}

const AdminLogin = () => {

    const [admindetails, setAdmindetails] = useState(initialvalue)
    const [logoutMessage, setLogoutMessage] = useState(null);
    const history = useHistory();
    const onValueInput = (e) => {
        setAdmindetails({ ...admindetails, [e.target.name]: e.target.value });
        console.log(admindetails);
    }

    const notifysuccess = (msg) => {
        toast.success(msg, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored'
        });
    }

    const notifyerror = (msg) => {
        toast.error(msg, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored'
        });
    }

    const adminCredentialsValidation = async (data) => {
        let retriveCredentials = await fetch("http://localhost:8080/admin/allAdmins")
        let validation = await retriveCredentials.json();
        let flag = false;
        console.log(validation);

        for (let i = 0; i < validation.length; i++) {
            if (validation[i].email === data.email && validation[i].password === data.password) {
                flag = true;
                sessionStorage.setItem("id", validation[i].id);
                // sessionStorage.setItem("category", 'null');
            }
        }
        if (flag === true) {
            notifysuccess('Admin Login Successfull !!!!');
            // alert("Admin Login Successfull !!!!") 
            history.push("/adminpage")
        }
        else {
            notifyerror("Admin Credentials are Incorrect !!!!!!")
            // alert("Admin Credentials are Incorrect !!!!!!")
        }
    }
    const handleClose = () => {
        // Set logout message
        setLogoutMessage("Logging out...");
        // Simulating delay before redirecting
        setTimeout(() => {
            // Redirecting to another page using window.location.href
            window.location.href = '/nav';
        }, 10); // Redirect after 2 seconds
    }
    return (
        <div>
            <HomeNavbar />
            <div className='login-form'>
                <Container maxWidth="sm">
                <button onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20, border: 'none', background: 'none', cursor: 'pointer',color:'black',fontSize:'20px',fontWeight:'bolder' }}>x</button>
                    <Box my={5}>
                        <Typography variant="h5" align="center">Admin Login</Typography>
                        <FormGroup>
                            <FormControl>
                                <InputLabel>Admin Email</InputLabel>
                                <Input onChange={(e) => onValueInput(e)} name="email" value={admindetails.email} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Admin Password</InputLabel>
                                <Input onChange={(e) => onValueInput(e)} name="password" value={admindetails.password} type="password" />
                            </FormControl>
                            <Box my={3}>
                               <Button variant="contained" onClick={() => adminCredentialsValidation(admindetails)} style={{ backgroundColor: '#1A237E', color: 'white' }} align="center">Login</Button>
                       
                          </Box>

                         
                        

                        </FormGroup>
                    </Box>
                </Container>
            </div>
        </div>
    )
}

export default AdminLogin;