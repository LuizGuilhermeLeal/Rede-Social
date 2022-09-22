import React from 'react';
import './style.css';

import Header from './components/header/index';
import Feed from './components/feed/feed';

function Home() {
    return (
        <div>
            <div className='header'>
                <Header />
            </div>
            <main className='feed'>
                <Feed/>
            </main>
        </div>
    );
}

export default Home;