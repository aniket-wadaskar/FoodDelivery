import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { axiosDeleteProduct, axiosAllProducts } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayImage from './DisplayImage';
toast.configure();

const AllProducts = () => {



  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProducts();
  }, [])//eslint-disable-line

  const getProducts = async () => {
    const response = await axiosAllProducts();
    console.log(response);

    setProduct(response.data);
  }

  const notifywarning = (msg) => {
    toast.warning(msg, {
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
  const deleteProduct = async (id) => {
    await axiosDeleteProduct(id);
    notifywarning("The Product has been deleted successfully!!!")
    getProducts();
  }
  return (
    <div >
      <div className="add-productbtn">
        <Button variant="contained" color="primary" align="center" component={Link} to={`/addproduct`}><center>Add Product</center></Button>
      </div>

      <div className='cardcontainer'>

        <Container >

          <Grid container spacing={3} >
            {product.map((data) => (
              <Grid item key={data.productId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <div className="image-container">
                    <div className="image-wrapper">
                      <DisplayImage image={data.productImage} />
                      <div className="hover-effect"></div>
                    </div>
                  </div>
                  <CardContent>
                    <Typography variant="h6">{data.productName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {data.productPrice}
                    </Typography>
                  </CardContent>
                  <center><Button component={Link} to={`/uploadimage/${data.productId}`} variant="text" color="primary" size="small">Upload Image</Button></center>
                  <CardActions>

                    <Button component={Link} to={`/editproduct/${data.productId}`} variant="text" color="primary" size="small">Edit</Button>
                    <Button onClick={() => deleteProduct(data.productId)} style={{ marginLeft: '80px' }} variant="text" color="secondary" size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  )

}

export default AllProducts;