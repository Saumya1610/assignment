import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { clearUsername } from '../../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './Gameboard.css';
import CardDisplay from '../../Molecules/CardDisplay/CardDisplay';
import { toast } from 'react-toastify';
import Button from '../../Atoms/Button/Button';

const Gameboard = ({ playerId }) => {
    const [undrawnCards, setUndrawnCards] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [winCount, setWinCount] = useState(0);
    const [loseCount, setLoseCount] = useState(0);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const fetchRandomCards = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-random-cards');
            const data = await response.json();
            if (response.ok) {
                setUndrawnCards(data.cards);
            } else {
                console.error(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('An error occurred while fetching random cards.');
        }
    };

    useEffect(() => {
        // Fetch random cards from the server
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

    const updatePlayerStats = async (win, loss) => {
        try {
            const response = await fetch(`http://localhost:8080/updatePlayerStats/${playerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ win, loss }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Player stats updated successfully:', data);
            } else {
                console.error(`Error updating player stats: ${data.error}`);
            }
        } catch (error) {
            console.error('An error occurred while updating player stats:', error);
        }
    };

    const handleCardClick = async (index) => {
      // Toggle flipped state of the card at the given index
      setFlippedCards((prevFlippedCards) => {
          const newFlippedCards = [...prevFlippedCards];
          newFlippedCards[index] = !newFlippedCards[index];
          return newFlippedCards;
      });
  
      const card = undrawnCards[index];
      switch (card) {
          case 'cat':
          case 'defuse':
              setDrawnCards((prevDrawnCards) => [...prevDrawnCards, card]);
              // Remove the drawn card from the undrawnCards array
              setUndrawnCards((prevUndrawnCards) =>
                  prevUndrawnCards.filter((_, idx) => idx !== index)
              );
              break;
  
          case 'shuffle':
              setDrawnCards([]);
              fetchRandomCards();
              break;
  
          case 'exploding':
              if (drawnCards.includes('defuse')) {
                  const defuseIndex = drawnCards.indexOf('defuse');
                  // Remove one defusing card from the drawnCards array
                  setDrawnCards((prevDrawnCards) => {
                      const updatedDrawnCards = [...prevDrawnCards];
                      updatedDrawnCards.splice(defuseIndex, 1);
                      return updatedDrawnCards;
                  });
                  // Remove the exploding card from the undrawnCards array
                  setUndrawnCards((prevUndrawnCards) =>
                      prevUndrawnCards.filter((_, idx) => idx !== index)
                  );
              } else {
                  // Player does not have a defusing card, update loss count
                  setLoseCount((prevLoseCount) => prevLoseCount + 1);
                  // Display toast indicating game over
                  alert('You lost the game!');
                  // Reset drawn and undrawn cards
                  setDrawnCards([]);
                  fetchRandomCards();
              }
              break;
  
          default:
              break;
      }
  
      // Check if the game is won (undrawn cards are empty)
      if (undrawnCards.length === 0) {
          // Update win count
          setWinCount((prevWinCount) => prevWinCount + 1);
          // Display toast indicating game won
          alert('You won the game!');
          // Reset drawn and undrawn cards
          setDrawnCards([]);
          fetchRandomCards();
      }
  
  };
  console.log(winCount)
  console.log(loseCount)
  updatePlayerStats(winCount,loseCount);
  
    const handleLogout = () => {
        dispatch(clearUsername()); 
        navigate('/'); 
    };

    return (
        <div className='gameboard'>
            <Button onClick={handleLogout}>Logout</Button> 
            <div>
                <h2>Drawn Cards:</h2>
                <ul style={{ display: 'flex' }}>
                    {drawnCards.map((card, index) => (
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
            <div>
                <h2>Undrawn Cards:</h2>
                <ul style={{ display: 'flex' }}>
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
            <div>
                <h2>Win Count: {winCount}</h2>
                <h2>Lose Count: {loseCount}</h2>
            </div>
        </div>
    );
};

export default Gameboard;