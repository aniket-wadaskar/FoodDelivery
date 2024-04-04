import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { axiosGetAllOrders, updateOrderStatus, updateOrderToDelivered } from '../Service-Components/ServiceOrder';
import { TablePagination } from '@mui/material';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); 

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axiosGetAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId); // Call the service method to update the order status
      // Update the order status in the local state
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.orderId === orderId) {
          return { ...order, status: 'Accepted' }; // Assuming the status is updated to 'Accepted'
        }
        return order;
      }));
      console.log('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}/ Time- ${hours}:${minutes}`;
  };

  const handleDelivered = async (orderId) => {
    try {
      await updateOrderToDelivered(orderId);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.orderId === orderId) {
          return { ...order, status: 'Delivered' };
        }
        return order;
      }));
      console.log('Order status updated to delivered successfully');
    } catch (error) {
      console.error('Failed to update order status to delivered:', error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div class="allOrders-Container">
      <div className='allOrders-tbl'>
        <TableContainer component={Paper} style={{ width: '150%' }}>
          <Table style={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell><b>Order ID</b></TableCell>
                <TableCell style={{ width: '16%' }}><b>Order Date</b></TableCell>
                <TableCell><b>Order Status</b></TableCell>
                <TableCell><b>Total Price</b></TableCell>
                <TableCell><b>Items</b></TableCell>
                <TableCell><b>Customer ID</b></TableCell>
                <TableCell><b>Delivery Partner</b></TableCell> {/* Added Delivery Partner column */}
                <TableCell><b>Order Acceptance</b></TableCell>
                <TableCell><b>Delivery Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell><b>{order.orderId}</b></TableCell>
                  <TableCell><b>{formatOrderDate(order.date)}</b></TableCell>
                  <TableCell><b>{order.status}</b></TableCell>
                  <TableCell><b>{order.orderedCartDTO ? (order.orderedCartDTO.totalPrice !== undefined ? order.orderedCartDTO.totalPrice : 'N/A') : 'N/A'}</b></TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Link to={`/orders/${order.orderId}`} style={{ display: 'block' }}><b>See Items</b></Link>
                  </TableCell>
                  <TableCell><b>{order.orderedCartDTO && order.orderedCartDTO.customer ? order.orderedCartDTO.customer.id : 'N/A'}</b></TableCell>
                  <TableCell><b>{order.deliveryPartnerName || 'N/A'}</b></TableCell>
                  <TableCell>
                    {order.status !== 'Accepted' && order.status !== 'Delivered' ? (
                      <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleAccept(order.orderId)}>Accept</Button>
                    ) : (
                      <Button variant="contained" style={{ backgroundColor: 'gray', color: 'white' }} disabled>Accepted</Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.status === 'Accepted' ? (
                      <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelivered(order.orderId)}>Delivered</Button>
                    ) : (
                      <Button variant="contained" style={{ backgroundColor: 'gray', color: 'white' }} disabled>Delivered</Button>
                    )}
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
            width: '150%',
            backgroundColor: 'white',
            marginLeft: 'auto',
          }}
          rowsPerPageOptions={[3,5,10,15]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default AllOrders;
