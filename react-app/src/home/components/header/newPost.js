import React from 'react';
import '../../../home/style.css';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
//import pageNewPost from './pageNewPost';


function NewPost() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('./post/new');
    }

    return (
        <Box className='icons'>
            <IconButton aria-label="add"  color='secondary' onclick={handleClick}>
                <AddIcon/>
            </IconButton>
        </Box>
    )
}

export default NewPost;
