import '../App.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const styling = makeStyles({
    home: {
        color: '#280659',
        textDecoration: 'none',
    },
 
    rightButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
    },
});

const HomeNavbar = () => {
    const styles = styling();
    

    return (
        <AppBar position="static" color='transparent'>
            <Toolbar variant="dense">
                

                <div className={styles.rightButtonsContainer}>
                    <h1 className='mainName'>HungerBox</h1>

                    <NavLink to="/user" className="righttButton">
                        Customer Login
                    </NavLink>
                    <NavLink to="/admin" className="lefttButton">
                        Admin Login
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
