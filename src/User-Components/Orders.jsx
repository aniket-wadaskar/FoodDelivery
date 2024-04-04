import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetOrdersByCustId } from '../Service-Components/ServiceOrder';
import { TablePagination } from '@mui/material';

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); 
  useEffect(() => {
    getOrder();
  },[])//eslint-disable-line

  const getOrder = async () => {
    let custid = sessionStorage.getItem('id');
    const response = await axiosGetOrdersByCustId(custid);
    console.log(response);
    setOrder(response.data);
  }
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}/Time- ${hours}:${minutes}`;
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className>
    <div className='allOrders-tbl1'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Order Date</b></TableCell>
              <TableCell><b>Order Status</b></TableCell>
              <TableCell><b>TotalPrice</b></TableCell>
              <TableCell><b>Delivery Partner</b></TableCell> {/* Added Delivery Partner column */}
              <TableCell><b>Items</b></TableCell>
              
              

            </TableRow>
          </TableHead>
          <TableBody>
            {order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow key={data.orderId}>
                <TableCell><b>{data.orderId}</b></TableCell>
                <TableCell><b>{formatOrderDate(data.date)}</b></TableCell>
                <TableCell><b>{data.status}</b></TableCell>
                <TableCell><b>{data.orderedCartDTO.totalPrice}</b></TableCell>
                <TableCell><b>{data.deliveryPartnerName || 'N/A'}</b></TableCell> {/* Display Delivery Partner name */}
                <TableCell>
                  <Link to={`/orders/${data.orderId}`}><b>See Items</b></Link>
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
          count={order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  </div>
);
};

export default Orders;