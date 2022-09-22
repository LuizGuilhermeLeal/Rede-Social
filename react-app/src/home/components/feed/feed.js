import React from 'react';
import '../../../home/style.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import PostCard from './postCard/index';

const posts = [
    {
        id: 1,
        author: {
            id: 1,
            name: 'ONG pet',
            username: 'ONGpet',
            avatar: '/images/avatars/avatar01.png',
        }, 
        date: 'Há 9 minutos',
        description: 'E ai pessoal, estão disponíveis para adoção.',
        image: '/images/posts/post01.jpg',
    },
    {
        id: 2,
        author: {
            id: 1,
            name: 'ONG pet',
            username: 'ONGpet',
            avatar: '/images/avatars/avatar02.png',
        },
        date: 'Há 2 horas',
        description: 'E ai pessoal, estão disponíveis para adoção.',
        image: '/images/posts/post02.jpg',
    },
    {
        id: 3,
        author: {
            id: 1,
            name: 'ONG pet',
            username: 'ONGpet',
            avatar: '/images/avatars/avatar02.png',
        },
        date: 'Há 2 horas',
        description: 'E ai pessoal, estão disponíveis para adoção.',
        image: '/images/posts/post02.jpg',
    },
    {
        id: 4,
        author: {
            id: 1,
            name: 'ONG pet',
            username: 'ONGpet',
            avatar: '/images/avatars/avatar02.png',
        },
        date: 'Há 2 horas',
        description: 'E ai pessoal, estão disponíveis para adoção.',
        image: '/images/posts/post02.jpg',
    },
    {
        id: 5,
        author: {
            id: 1,
            name: 'ONG pet',
            username: 'ONGpet',
            avatar: '/images/avatars/avatar01.png',
        }, 
        tittle: 'Disponíveis para adoção',
        date: 'Há 9 minutos',
        description: 'E ai pessoal, estão disponíveis para adoção.',
        image: '/images/posts/post01.jpg',
    },
];

function Feed() {
    return (
        <main>
            <Container maxWidth='md'>
                <Box display='flex' flexDirection='column'>
                    {
                        posts.map(post =>(
                            <PostCard key={post.id} post={ post }/>
                        ))
                    }
                </Box>
            </Container>
        </main>
    )
}

export default Feed;