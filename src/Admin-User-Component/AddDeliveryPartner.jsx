import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Select, MenuItem, Box, FormGroup, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { axiosAddDeliveryPartner } from '../Service-Components/ServiceDeliveryPartner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialPartner = {
    partnerName: "",
    partnerAge: "",
    gender: "",
    contactNumber: ""
};

const AddDeliveryPartner = () => {
    const [partner, setPartner] = useState(initialPartner);
    const { partnerName, partnerAge, gender, contactNumber } = partner;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const onValueInput = (e) => {
        setPartner({ ...partner, [e.target.name]: e.target.value });
    };

    const notifySuccess = (msg) => {
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
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!/^[a-zA-Z ]{4,}$/.test(partnerName)) {
            newErrors.partnerName = 'Partner name must contain only alphabets and have at least 4 characters.';
            valid = false;
        }

        if (!gender) {
            newErrors.gender = 'Please select a gender.';
            valid = false;
        }

        const age = parseInt(partnerAge);
        if (isNaN(age) || age < 18 || age > 100) {
            newErrors.partnerAge = 'Please enter a valid age between 18 and 100.';
            valid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(contactNumber)) {
            newErrors.contactNumber = 'Please enter a valid 10-digit contact number.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const addPartner = async () => {
        if (validateForm()) {
            await axiosAddDeliveryPartner(partner);
            notifySuccess('Delivery Partner Added Successfully');
            history.push('/deliverypartner');
        }
    };

    return (
        <div className='add-delivery-partner-form'>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center">Add Delivery Partner</Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Partner Name</InputLabel>
                            <Input onChange={onValueInput} name="partnerName" value={partnerName} />
                            {errors.partnerName && <span style={{ color: 'red' }}>{errors.partnerName}</span>}
                        </FormControl>

                        <FormControl>
                            <InputLabel>Partner Age</InputLabel>
                            <Input type="number" onChange={onValueInput} name="partnerAge" value={partnerAge} />
                            {errors.partnerAge && <span style={{ color: 'red' }}>{errors.partnerAge}</span>}
                        </FormControl>

                     
                        <FormControl>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={onValueInput}
                                name="gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                            {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                        </FormControl>

                        <FormControl>
                            <InputLabel>Contact Number</InputLabel>
                            <Input onChange={onValueInput} name="contactNumber" value={contactNumber} />
                            {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber}</span>}
                        </FormControl>

                        <Box my={3}>
                            <Button variant="text" onClick={addPartner} color="primary" align="center">Add Partner</Button>
                            <Button onClick={() => history.push('/deliverypartner')} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    );
};

export default AddDeliveryPartner;
