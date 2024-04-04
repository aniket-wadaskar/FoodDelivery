import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosCategoryGetById, axiosUpdateCategory } from '../Service-Components/ServiceCategory';

const myComponent = {
    width: '550px',
    height: '400px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '150px',
    left: '350px'
};

toast.configure();


const initialvalue = {
    categoryName: "",

}
const UpdateCategory = () => {

    const [category, setCategory] = useState(initialvalue);
    const { categoryName } = category;
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const onValueInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
        console.log(category);
    }

    useEffect(() => {

        loadAllCategories();

    },[])//eslint-disable-line

    const validateForm = () => {
        let valid = true;
        const newErrors = {};


        if (category.categoryName.length < 2) {
            newErrors.categoryName = 'Category Name must be at least 2 characters long.';
            valid = false;
        }


        setErrors(newErrors);
        return valid;
    }
    const loadAllCategories = async () => {
        const response = await axiosCategoryGetById(id);
        setCategory(response.data)
        console.log(category);
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

    const UpdateCategory = async () => {
        if (validateForm()) {
            await axiosUpdateCategory(id, category);
            notifysuccess("The details of '" + categoryName + "' has been updated successfully!!!")
            history.push('/allcategories');
        }
    }

    return (
        <div className='add-product-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center"><b>Update Category Details</b></Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Category Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="categoryName" value={categoryName} />
                            {errors.categoryName && <span style={{ color: 'red' }}>{errors.categoryName}</span>}
                        </FormControl>


                        <Box my={3}>
                            <Button variant="text" onClick={() => UpdateCategory()} color="primary" align="center">Update</Button>
                            <Button component={Link} to={`/allcategories`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateCategory;