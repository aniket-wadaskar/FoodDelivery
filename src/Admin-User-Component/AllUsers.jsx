import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAllUsers, axiosDeleteUser } from '../Service-Components/ServiceUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@mui/material';

toast.configure();

// Display all Users
const AllUsers = () => {


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


  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getUsers();
  }, [])//eslint-disable-line

  const getUsers = async () => {
    const response = await axiosAllUsers();
    console.log(response);
    setUsers(response.data);
  }

  const deleteUser = async (id) => {
    await axiosDeleteUser(id);
    notifywarning("The User has been deleted successfully!!!")
    getUsers();
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

      </div>
      <div className='allusers-tbl'>
        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>UserName</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>MobileNumber</b></TableCell>
                <TableCell><b>Address</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/edituser/${user.id}`} variant="text" color="primary" size="small">Edit</Button>
                    <Button onClick={() => deleteUser(user.id)} style={{ marginLeft: '20px' }} variant="text" color="secondary" size="small">Delete</Button>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>



  )

}

export default AllUsers;