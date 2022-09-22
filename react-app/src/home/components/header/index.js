import React from 'react';
import '../../../home/style.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import AccountMenu from './accountMenu';
import NewPost from './newPost';

function Header() {
    return (
        <AppBar position='fixed' color='default' >
            <Toolbar>
            <Box>
                <a href='/'><img src='./images/logo.png' alt='logo' className='img'></img></a>
            </Box>
            <Box>
                <Input className='input' placeholder='Pesquisar'></Input>
            </Box>

            <Box className='icons'>
                <NewPost/>
                <AccountMenu/>
            </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;