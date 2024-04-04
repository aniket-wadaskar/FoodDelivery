import '../App.css';
import React from 'react';
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

const HomeNavbar = ({ currentUser }) => {
    const styles = styling();
    

    return (
        <AppBar position="static" color='transparent' elevation={0}>
            <Toolbar variant="dense">
                

                <div className={styles.rightButtonsContainer}>
                    <h1 className='mainName'>HungerBox</h1>

                </div>
            
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
