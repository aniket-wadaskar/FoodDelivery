import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { axiosAddToCart, axiosDeleteProductCart } from '../Service-Components/ServiceCart';
import { axiosGetCart } from '../Service-Components/ServiceUser';
import { axiosPlaceOrder } from '../Service-Components/ServiceOrder';
import DisplayImageCust from './DisplayImageCust';
 
const DisplayCart = () => {
  const history = useHistory();
  const [cart, setCart] = useState({});
  const [cart1, setCart1] = useState({});
 
  useEffect(() => {
    getCarts();
  }, []); //eslint-disable-line
 
  const getCarts = async () => {
    let custid = sessionStorage.getItem('id');
    const response = await axiosGetCart(custid);
    console.log(response);
    setCart(response.data.cartItems);
    setCart1(response.data);
    console.log(cart);
  };
 
  const addToCart = async (id) => {
    let custid = sessionStorage.getItem('id');
    await axiosAddToCart(custid, id);
    getCarts();
    history.push('/cart');
  };
 
  const deleteProductCart = async (id) => {
    let custid = sessionStorage.getItem('id');
    await axiosDeleteProductCart(custid, id);
    getCarts();
    history.push('/cart');
  };
 
  const placeOrder = async () => {
    let custid = sessionStorage.getItem('id');
    await axiosPlaceOrder(custid);
    history.push('/payment');
  };
 
  return (
    <div>
      <div className="total-display">
        <b>
          <h1>Total Price: {cart1.totalPrice}/-</h1>
        </b>
      </div>
 
      <Container>
        <Grid container spacing={3}>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((cartitem) => (
              cartitem.quantity > 0 && // Only render if quantity is greater than 0
              <Grid item key={cartitem.product.productId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <div className="image-container">
                    <div className="image-wrapper">
                      <DisplayImageCust image={cartitem.product.productImage} />
                      <div className="hover-effect"></div>
                    </div>
                  </div>
                  <CardContent>
                    <Typography variant="h6">{cartitem.product.productName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {cartitem.product.productPrice}
                    </Typography>
                  </CardContent>
                  <Button
                    className="inc"
                    onClick={() => addToCart(cartitem.product.productId)}
                    variant="contained"
                    style={{ backgroundColor: '#2196F3', color: 'white' }}
                    size="small"
                  >
                    <strong>+</strong>
                  </Button>
                  <b className="quanty">{cartitem.quantity}</b>
                  <Button
                    className="dec"
                    onClick={() => deleteProductCart(cartitem.product.productId)}
                    variant="contained"
                    style={{ backgroundColor: '#F44336', color: 'white' }}
                    size="small"
                  >
                    <strong>-</strong>
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="cart-em">
              <h1>Your cart is empty.</h1>
            </div>
          )}
        </Grid>
      </Container>
 
      {cart1.totalPrice > 0 && (
        <Button
          onClick={() => placeOrder()}
          variant="contained"
          color="primary"
          size="large"
          className="place"
          style={{
            marginTop: '20px',
            alignItems: 'center',
            backgroundColor: '#1E88E5',
            color: 'white',
            '&:hover': {
              backgroundColor: 'white',
              color: '#2E7D32',
            },
          }}
        >
          <strong>Place Order</strong>
        </Button>
      )}
    </div>
  );
};
 
export default DisplayCart;