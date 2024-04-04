import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button, MenuItem, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { axiosAddProduct } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const myComponent = {
    width: '550px',
    height: '350px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '160px',
    left: '350px'
};
toast.configure();


const AddProduct = () => {

    const [product, setProduct] = useState({
        productName: '',
        productPrice: 0,
        brand: '',
        productImage: '',
        category: null,
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const onValueInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        console.log(product);
    }
    const validateForm = () => {
        let valid = true;
        const newErrors = {};


        if (!/[0-9]/.test(product.productPrice)) {
            newErrors.productPrice = 'Mustbe Number ';
            valid = false;
        }
        if (product.productName.length < 2) {
            newErrors.productName = 'Product Name must be at least 2 characters long.';
            valid = false;
        }


        setErrors(newErrors);
        return valid;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/category/findAll').then((response) => {
            setCategories(response.data);
            console.log(categories);
        }

        );
    },);

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

    const addProduct = async () => {
        if (validateForm()) {
            await axiosAddProduct(product);
            notifysuccess("New Product: '" + product.productName + "' added into the database successfully!!!")
            history.push('/productsall');
        }
        else
            console.log("Invalid")
    }

    return (
        <div className='add-product-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center"><b>Add Product Details</b></Typography>
                    <FormGroup>
                        <FormControl className='.fromControl'>
                            <InputLabel>Product Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productName" value={product.productName} />
                            {errors.productName && <span style={{ color: 'red' }}>{errors.productName}</span>}
                        </FormControl>
                       
                            <FormControl className='.fromControl' variant="outlined" fullWidth>
                                <InputLabel>Product Category</InputLabel>
                                <Select
                                    value={product.category ? product.category.categoryId : ''}
                                    onChange={(e) => {
                                        const selectedCategoryId = e.target.value;
                                        const selectedCategory = categories.find((c) => c.categoryId === selectedCategoryId);
                                        setProduct({ ...product, category: selectedCategory });
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select a Category</em>
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        <FormControl className='.fromControl'>
                            <InputLabel>Product Price</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productPrice" value={product.productPrice} />
                            {errors.productPrice && <span style={{ color: 'red' }}>{errors.productPrice}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => addProduct()} color="primary" align="center">Add Product</Button>
                            <Button component={Link} to={`/productsall`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default AddProduct;