import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAllCategories } from '../Service-Components/ServiceCategory';
import { TablePagination } from '@mui/material';


const AllCategories = () => {

  const [category, setCategory] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getCategories();
  },[])//eslint-disable-line

  const getCategories = async () => {
    const response = await axiosAllCategories();
    console.log(response);
    setCategory(response.data);
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
        <Button variant="contained" color="primary" align="center" component={Link} to={`/addCategory`}>Add Category</Button>
      </div>
      <div className='allcategories-tbl'>


        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>CategoryName</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item.categoryId}>
                  <TableCell>{item.categoryId}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/editCategory/${item.categoryId}`} variant="text" color="primary" size="small">Edit</Button>
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
          count={category.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>



  )

}

export default AllCategories;