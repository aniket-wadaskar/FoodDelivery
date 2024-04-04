import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Select, MenuItem, Box, FormGroup, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetDeliveryPartnerById, axiosUpdateDeliveryPartner } from '../Service-Components/ServiceDeliveryPartner';

const myComponent = {
    width: '550px',
    height: '450px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '120px',
    left: '350px'
};
const UpdateDeliveryPartner = () => {
    const [partner, setPartner] = useState({
        partnerName: "",
        partnerAge: "",
        gender: "",
        contactNumber: ""
    });

    const { partnerName, partnerAge, gender, contactNumber } = partner;
    const [errors, setErrors] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const loadDeliveryPartner = async () => {
            const response = await axiosGetDeliveryPartnerById(id);
            setPartner(response.data);
        }
        loadDeliveryPartner();
    }, [id]);

    const history = useHistory();

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
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        if (!/^[a-zA-Z ]{4,}$/.test(partnerName)) {
            newErrors.partnerName = 'Partner name must contain only alphabets and have at least 5 characters.';
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
    }
    

    const onUpdatePartner = async () => {
        if (validateForm()) {
            await axiosUpdateDeliveryPartner(id, partner);
            notifySuccess("The details of '" + partnerName + "' has been updated successfully!!!")
            history.push('/deliverypartner');
        }
    }

    const handleInputChange = (e) => {
        setPartner({ ...partner, [e.target.name]: e.target.value });
    }

    return (
        <div className='update-delivery-partner-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center" style={{Padding:20}}><b>Update Delivery Partner Details</b></Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Partner Name</InputLabel>
                            <Input name="partnerName" value={partnerName} onChange={handleInputChange} />
                            {errors.partnerName && <span style={{ color: 'red' }}>{errors.partnerName}</span>}
                        </FormControl>

                        <FormControl>
                            <InputLabel>Partner Age</InputLabel>
                            <Input type="number" name="partnerAge" value={partnerAge} onChange={handleInputChange} />
                            {errors.partnerAge && <span style={{ color: 'red' }}>{errors.partnerAge}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={handleInputChange}
                                name="gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                            {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                        </FormControl>

                        <FormControl>
                            <InputLabel>Contact Number</InputLabel>
                            <Input name="contactNumber" value={contactNumber} onChange={handleInputChange} />
                            {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber}</span>}
                        </FormControl>

                        <Box my={3}>
                            <Button variant="text" onClick={onUpdatePartner} color="primary" align="center">Update</Button>
                            <Button component={Link} to={`/deliverypartner`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateDeliveryPartner;
