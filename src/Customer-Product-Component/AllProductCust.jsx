import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Card, CardContent, CardActions, Button, Paper } from '@mui/material';
import { axiosAllProducts, axiosGetBycategoryId } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAddToCart } from '../Service-Components/ServiceCart';
import axios from 'axios';
import DisplayImageCust from './DisplayImageCust';
import './AllProductCust.css';

toast.configure();

const AllProductCust = () => {
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");


    useEffect(() => {
        getProducts();
        axios.get('http://localhost:8080/category/findAll').then((response) => {
            setCategories(response.data);
        }).catch( error => console.log(error));
    }, []);

    const getProducts = async () => {
        const response = await axiosAllProducts();
        setProduct(response.data);
    };

    const DisplayCategoryProducts = async (id) => {
        if (id !== "") {
            const response = await axiosGetBycategoryId(id);
            setProduct(response.data);
        }
        if (id === "") {
            getProducts();
        }
        setSelectedCategoryId(id);
    };

    const notifysuccess = (productName) => {
        toast.success(`${productName} added to cart successfully`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
        });
    };

    const addToCart = async (id,productName) => {
        let custid = sessionStorage.getItem('id');
        axiosAddToCart(custid, id);
        notifysuccess(productName);
        history.push('/viewproducts');
    };

    return (
        <div className="all-product-cust">
            <Paper className="categories-paper">
                <Typography variant="h6" className="category-title">
                    Category
                </Typography>
                <div className="category-list">
                    <div
                        className={`category-item ${selectedCategoryId === '' ? 'selected' : ''}`}
                        onClick={() => DisplayCategoryProducts('')}
                    >
                        All
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category.categoryId}
                            className={`category-item ${selectedCategoryId === category.categoryId ? 'selected' : ''}`}
                            onClick={() => DisplayCategoryProducts(category.categoryId)}
                        >
                            {category.categoryName}
                        </div>
                    ))}
                </div>
            </Paper>

            <div className="product-cards">
                {product.map((data) => (
                    <Card key={data.productId}>
                        <div className="image-container">
                            <DisplayImageCust image={data.productImage} />
                        </div>
                        <CardContent>
                            <Typography variant="h6">{data.productName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price: {data.productPrice}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => addToCart(data.productId,data.productName)}
                                variant="text"
                                color="primary"
                                size="small"
                            >
                                Add To Cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AllProductCust;
