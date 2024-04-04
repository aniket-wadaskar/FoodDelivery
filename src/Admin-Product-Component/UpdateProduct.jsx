import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button, MenuItem, Select } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { axiosGetById, axiosUpdateProduct } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAllCategories } from '../Service-Components/ServiceCategory';

const myComponent = {
    width: '550px',
    height: '450px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '100px',
    left: '350px'
};

toast.configure();



const UpdateProduct = () => {

    const [product, setProduct] = useState({
        productName: '',
        productPrice: 0,
        brand: '',
        productImage: '',
        category: null,
    });
    const [category, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const onValueInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        console.log(product);
    }

    useEffect(() => {

        loadProductdeatils();

    },[])//eslint-disable-line

    const loadProductdeatils = async () => {
        const response = await axiosGetById(id);
        setProduct(response.data)
        const responsecat = await axiosAllCategories();
        setCategories(responsecat.data)
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


        if (!/[0-9]/.test(product.productPrice)) {
            newErrors.productPrice = 'Mustbe Number ';
            valid = false;
        }
        if (product.productName.length < 2) {
            newErrors.productName = 'Product Name must be at least 2 characters long.';
            valid = false;
        }
        if (product.brand.length < 2) {
            newErrors.brand = 'Brand must be at least 2 characters long.';
            valid = false;
        }


        setErrors(newErrors);
        return valid;
    }

    const UpdateProductDetails = async () => {
        if (validateForm()) {
            await axiosUpdateProduct(id, product);
            notifysuccess("The details of '" + product.productName + "' has been updated successfully!!!")
            history.push('/productsall');
        }
    }

    return (
        <div className='add-product-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center"><b>Update Product Details</b></Typography>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Product Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productName" value={product.productName} />
                            {errors.productName && <span style={{ color: 'red' }}>{errors.productName}</span>}
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Product Category</InputLabel>
                            <Select
                                value={product.category ? product.category.categoryId : ''}
                                onChange={(e) => {
                                    const selectedCategoryId = e.target.value;
                                    const selectedCategory = category.find((c) => c.categoryId === selectedCategoryId);
                                    setProduct({ ...product, category: selectedCategory });
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select a Category</em>
                                </MenuItem>
                                {category.map((cat) => (
                                    <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                        {cat.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Product Price</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productPrice" value={product.productPrice} />
                            {errors.productPrice && <span style={{ color: 'red' }}>{errors.productPrice}</span>}
                        </FormControl>
                        <FormControl>
                            <InputLabel>Product Brand</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="brand" value={product.brand} />
                            {errors.brand && <span style={{ color: 'red' }}>{errors.brand}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => UpdateProductDetails()} color="primary" align="center">Update</Button>
                            <Button component={Link} to={`/productsall`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateProduct;