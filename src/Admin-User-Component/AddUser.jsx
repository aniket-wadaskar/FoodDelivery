import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { axiosAddUser } from '../Service-Components/ServiceUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialvalue = {
    username: "",
    password: "",
    email: "",
    number: "",
    address: ""
}
const AddUser = () => {

    const [user, setUser] = useState(initialvalue);
    const { username, password, email, number, address } = user;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const onValueInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
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

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(user.number)) {
            newErrors.number = 'Please enter a valid 10-digit mobile number.';
            valid = false;
        }
        // Password must be at least 8 characters long
        if (user.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
            valid = false;
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(user.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter.';
            valid = false;
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(user.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter.';
            valid = false;
        }

        // Check for at least one number
        if (!/[0-9]/.test(user.password)) {
            newErrors.password = 'Password must contain at least one number.';
            valid = false;
        }

        // Check for at least one special character
        //eslint-disable-next-line
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(user.password)) {
            newErrors.password = 'Password must contain at least one special character.';
            valid = false;
        }
        if (user.username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters long.';
            valid = false;
        }
        if (user.address.length < 3) {
            newErrors.address = 'Address must be at least 3 characters long.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const AddUser = async () => {
        if (validateForm()) {
            await axiosAddUser(user);
            notifysuccess('User Added Succeffully');
            history.push('/allusers');
        }
        else {
            console.log('Form is invalid');
        }
    }
    return (
        <div className='register-form'>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center">Admin Signup</Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Admin Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="username" value={username} />
                            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Admin Email</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="email" value={email} />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="password" value={password} />
                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Mobile Number</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="number" value={number} />
                            {errors.number && <span style={{ color: 'red' }}>{errors.number}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="address" value={address} />
                            {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => AddUser()} color="primary" align="center">Add Admin</Button>
                            <Button onClick={() => history.push("/allusers")} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                            <br></br><br></br>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>

    )
}

export default AddUser;