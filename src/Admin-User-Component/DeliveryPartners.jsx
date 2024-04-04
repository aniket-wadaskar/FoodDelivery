import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { axiosGetAllDeliveryPartners, axiosDeleteDeliveryPartner } from '../Service-Components/ServiceDeliveryPartner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@mui/material';

toast.configure();

// Display all Delivery Partners
const DeliveryPartners = () => {
  
  const notifyWarning = (msg) => {
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

  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getDeliveryPartners();
  }, []);

  const getDeliveryPartners = async () => {
    const response = await axiosGetAllDeliveryPartners();
    console.log(response);
    setDeliveryPartners(response.data);
  }

  const deleteDeliveryPartner = async (id) => {
    await axiosDeleteDeliveryPartner(id);
    notifyWarning("The Delivery Partner has been deleted successfully!!!")
    getDeliveryPartners();
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
       <div className="add-productbtn">
        <Button variant="contained" color="primary" align="center" component={Link} to={`/adddeliverypartner`}>Add Partner</Button>
      </div>
      <div className='all-delivery-partners-tbl'>
        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell><b>Delivery Partner ID</b></TableCell>
                <TableCell><b>Partner Name</b></TableCell>
                <TableCell><b>Partner Age</b></TableCell>
                <TableCell><b>Gender</b></TableCell>
                <TableCell><b>Contact Number</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryPartners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.id}</TableCell>
                  <TableCell>{partner.partnerName}</TableCell>
                  <TableCell>{partner.partnerAge}</TableCell>
                  <TableCell>{partner.gender}</TableCell>
                  <TableCell>{partner.contactNumber}</TableCell>
                  <TableCell>{partner.status}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/editdeliverypartner/${partner.id}`} variant="text" color="primary" size="small">Edit</Button>
                    <Button onClick={() => deleteDeliveryPartner(partner.id)} style={{ marginLeft: '80px' }} variant="text" color="secondary" size="small">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px',
            width: '100%',
            backgroundColor: 'white',
            marginLeft: 'auto',
          }}
          rowsPerPageOptions={[3,5,10,15]}
          component="div"
          count={deliveryPartners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default DeliveryPartners;
