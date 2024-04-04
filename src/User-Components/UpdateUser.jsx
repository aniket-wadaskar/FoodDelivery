import React, { useEffect, useState, useCallback } from 'react';
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
    currentPassword: "", // New field for current password
    password: "",
    // confirmPassword: ""

}
const UpdateUser = () => {
    const [user, setUser] = useState(initialvalue);
    const { username, email, address, number, password, confirmPassword } = user;
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const onValueInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    // Convert id to an integer
    const userId = parseInt(id);

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

        if (user.password || user.confirmPassword) {
        if (user.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }

        if (user.password && user.password.length < 8) {
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
        if (!/[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(user.password)) {
            newErrors.password = 'Password must contain at least one special character.';
            valid = false;
        }

        // Check for password and confirmPassword equality only if both fields are not empty
        if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }
    }
        setErrors(newErrors);
        return valid;
    }

    const UpdateUserDetails = async () => {
        const updatedUser = { ...user };

        // Remove password fields if they are empty
        if (!updatedUser.password) {
            delete updatedUser.password;
        }
        if (!updatedUser.confirmPassword) {
            delete updatedUser.confirmPassword;
        }
        
        if (validateForm()) {
            await axiosUpdateUser(id, user);
            notifysuccess("The details of '" + username + "' has been updated successfully!!!")
            history.push('');
        }
    }

    const loadAllUsers = useCallback(async () => {
        const response = await axiosGetUserById(userId);
        setUser(response.data)
    }, [userId]);

    useEffect(() => {
        loadAllUsers();
    }, [loadAllUsers]);

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
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input type="password" onChange={(e) => onValueInput(e)} name="password" value={password} />
                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Confirm Password</InputLabel>
                            <Input type="password" onChange={(e) => onValueInput(e)} name="confirmPassword" value={confirmPassword} />
                            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => UpdateUserDetails()} color="primary" align="center">Update</Button>
                            <Button component={Link} to={``} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateUser;