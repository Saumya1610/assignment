import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearUsername } from '../../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './Gameboard.css';
import CardDisplay from '../../Molecules/CardDisplay/CardDisplay';
import { toast } from 'react-toastify';
import Button from '../../Atoms/Button/Button';

const Gameboard = () => {
    const [undrawnCards, setUndrawnCards] = useState([]);
    const [removedCards, setRemovedCards] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [winCount, setWinCount] = useState(0);
    const [loseCount, setLoseCount] = useState(0);
    const [apiFetched, setApiFetched] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const userStats = useSelector(state => state.leaderboard.userStats);
    
    useEffect(() => {
    const updatePlayerStatsAndGameLogic = async () => {
        if ((apiFetched && undrawnCards.length === 0 )) {
            try {
                const userId = userStats.find(user => user.player === username)?.id;
                const url = `http://localhost:8080/updatePlayerStats/${userId}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        win:winCount,
                        loss:loseCount
                    })
                });

                if (response.ok) {
                    toast.success('Player stats updated successfully.');
                } else {
                    toast.error('Failed to update player stats:', response.statusText);
                }
            } catch (error) {
                toast.error('An error occurred while updating player stats:', error.message);
            }

            setWinCount((prevWinCount) => prevWinCount + 1);
            toast.success('Congratulations! You won the game!');
            setUserCards([]);
            setRemovedCards([]);
            fetchRandomCards();
        }
    };

    updatePlayerStatsAndGameLogic();
}, [apiFetched, undrawnCards, winCount, loseCount, userStats, username]);


    
    const fetchRandomCards = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-random-cards');
            const data = await response.json();
            if (response.ok) {
                setUndrawnCards(data.cards);
                setApiFetched(true);
            } else {
                toast.error(`Error: ${data.error}`);
            }

        } catch (error) {
            toast.error('An error occurred while fetching random cards.');
        }
        setWinCount(0);
        setLoseCount(0);
    };

    useEffect(() => {
        fetchRandomCards();
    }, []);

    const getEmoji = (type) => {
        switch (type) {
            case 'cat':
                return '😼';
            case 'defuse':
                return '🙅‍♂️';
            case 'shuffle':
                return '🔀';
            case 'exploding':
                return '💣';
            default:
                return '';
        }
    };

    const handleCardClick = async (index) => {
        const card = undrawnCards[index];
    
        switch (card) {
            case 'cat':
                const newRemovedCards = [...removedCards, card];
                setRemovedCards(newRemovedCards);
                setUndrawnCards((prevUndrawnCards) =>
                    prevUndrawnCards.filter((_, idx) => idx !== index)
                );
                toast.info("It's a Cat Card 😼 , Added to removed Cards");
                break;
            case 'defuse':
                const newUserCards = [...userCards, card];
                setUserCards(newUserCards);
                setUndrawnCards((prevUndrawnCards) =>
                    prevUndrawnCards.filter((_, idx) => idx !== index)
                );
                toast.info("It's a Defuse Card 🙅‍♂️ , Added to User Cards");
                break;
            case 'shuffle':
                setUserCards([]);
                setRemovedCards([]);
                toast.info("It's a Shuffle card 🔀 . The game is restarting again!");
                fetchRandomCards();
                break;
            case 'exploding':
                if (userCards.includes('defuse')) {
                    const defuseIndex = userCards.indexOf('defuse');
                    const updatedDrawnCards = [...userCards];
                    updatedDrawnCards.splice(defuseIndex, 1);
                    setUserCards(updatedDrawnCards);
                    setUndrawnCards((prevUndrawnCards) =>
                        prevUndrawnCards.filter((_, idx) => idx !== index)
                    );
                    toast.info("Phew! You had a Defuse Card. Bomb defused successfully");
                } else {
                    setLoseCount((prevLoseCount) => prevLoseCount + 1);
                    toast.info('Boom 💣 ! It\'s an exploding card. You\'ve lost the game!');
                    
                    // Update player stats
                    try {
                        const userId = userStats.find(user => user.player === username)?.id;
                        const url = `http://localhost:8080/updatePlayerStats/${userId}`;
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                win: winCount,
                                loss: loseCount + 1 // Incrementing lose count
                            })
                        });
    
                        if (response.ok) {
                            // Successfully updated player stats
                            toast.success('Player stats updated successfully.');
                        } else {
                            // Handle error
                            toast.error('Failed to update player stats:', response.statusText);
                        }
                    } catch (error) {
                        toast.error('An error occurred while updating player stats:', error.message);
                    }
    
                    setUserCards([]);
                    setRemovedCards([]);
                    fetchRandomCards();
                }
                break;
            default:
                break;
        }
    };
    
    

    const handleLogout = () => {
        dispatch(clearUsername());
        navigate('/');
    };

    return (
        <div className='gameboard'>
            <div className='user-and-removed'>
            <div className='display-cards-user'>
                <h2 className='cards-head'>User Cards</h2>
                <ul className='display-cards'>
                    {userCards.map((card, index) => (
                        <CardDisplay
                            key={index}
                            type={card}
                            emoji={getEmoji(card)}
                            flipped={true}
                        ></CardDisplay>
                    ))}
                    
                </ul>
            </div>
            <div className='display-cards-removed'>
                <h2 className='cards-head'>Removed Cards</h2>
                <ul className='display-cards'>
                    {removedCards.map((card, index) => (
                        <CardDisplay
                            key={index}
                            type={card}
                            emoji={getEmoji(card)}
                            flipped={true}
                        ></CardDisplay>
                    ))}
                    
                </ul>
            </div>
            </div>
            <div className='display-cards-continer'>
                <h2 className='cards-head'>Undrawn Cards</h2>
                <ul className='display-cards'>
                    {undrawnCards.map((card, index) => (
                        <CardDisplay
                            key={index}
                            type={card}
                            emoji={getEmoji(card)}
                            flipped={flippedCards[index]}
                            onClick={() => handleCardClick(index)}
                        ></CardDisplay>
                    ))}
                </ul>
            </div>
            <div className='logout-wrapper' >
                <Button className='logout' onClick={handleLogout}>Play With New User</Button>
            </div>
        </div>
    );
};

export default Gameboard;
