import React from 'react';
import './HomePage.css';
import LeaderBoard from '../../Organisms/LeaderBoard/LeaderBoard';
import Gameboard from '../../Organisms/GameBoard/Gameboard';

const HomePage = () => {
    return (
        <div className='home'>
            <Gameboard playerId={"e4341953-0e0b-4d15-9949-5fce126fb1b5"}/>
            <LeaderBoard />
        </div>
    );
};

export default HomePage;