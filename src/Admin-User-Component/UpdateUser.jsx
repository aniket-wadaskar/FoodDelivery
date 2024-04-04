import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetUserById, axiosUpdateUser } from '../Service-Components/ServiceUser';

const myComponent = {
    width: '550px',
    height: '450px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '120px',
    left: '350px'
};

toast.configure();


const initialvalue = {
    username: "",
    email: "",
    address: "",
    number: "",
}
const UpdateUser = () => {
    const [user, setUser] = useState(initialvalue);
    const { username, email, address, number } = user;
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const onValueInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    useEffect(() => {

        loadAllUsers();

    },[])//eslint-disable-line

    const loadAllUsers = async () => {
        const response = await axiosGetUserById(id);
        setUser(response.data)
    }

    const history = useHistory();


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

    const UpdateUserDetails = async () => {
        if (validateForm()) {
            await axiosUpdateUser(id, user);
            notifysuccess("The details of '" + username + "' has been updated successfully!!!")
            history.push('/allusers');
        }
    }

    return (
        <div className='update-user-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center"><b>Update User Details</b></Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>User Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="username" value={username} />
                            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        </FormControl>

                        <FormControl>
                            <InputLabel>Email</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="email" value={email} />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Number</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="number" value={number} />
                            {errors.number && <span style={{ color: 'red' }}>{errors.number}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="address" value={address} />
                            {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => UpdateUserDetails()} color="primary" align="center">Update</Button>
                            <Button component={Link} to={`/allusers`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateUser;