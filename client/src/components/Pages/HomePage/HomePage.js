import React from 'react';
import './HomePage.css';
import LeaderBoard from '../../Organisms/LeaderBoard/LeaderBoard';
import Gameboard from '../../Organisms/GameBoard/Gameboard';

const HomePage = () => {
    return (
        <div className='home'>
            <Gameboard />
            <LeaderBoard />
        </div>
    );
};

export default HomePage;