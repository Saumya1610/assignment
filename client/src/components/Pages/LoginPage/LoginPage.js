import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { setUsername } from '../../../actions/userActions';
import Button from '../../Atoms/Button/Button';
import Modal from "../../Molecules/Modal/Modal";
import { useSelector } from "react-redux"; 
import './LoginPage.css';

const LoginPage = ({ setUsername }) => { 
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [playername, setPlayername] = useState("");
    const username = useSelector(state => state.user.username);
console.log(username);
    const handlePlayernameChange = (e) => {
        setPlayername(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/store-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ player: playername }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setPlayername("");
                navigate('/game');
                // Dispatch action to update username in Redux store
                setUsername(playername);
            } else {
                toast.error(`Error: ${data.error}`);
            }
        } catch (error) {
            toast.error("An error occurred while communicating with the server.");
        }
    };

    return (
        <div className='login'>
        <div className='start'>
            <h1>Exploding Kittens</h1>
            <Button
                className="openModalBtn"
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                Start Game
            </Button>
            </div>
            {modalOpen && <Modal setOpenModal={setModalOpen} title={"Rules"} onChange={handlePlayernameChange} onClick={() => { handleSubmit(); setModalOpen(false); }}>
                <ul>
                    <li>- when the game is started there will be a deck of 5 cards ordered randomly.</li>
                    <li>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
                    <li>- If the card is exploding kitten (bomb) then the player loses the game.</li>
                    <li>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
                    <li>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
                    <li>- If the player has any card with him other that exploding kitten card or shuffle card after picking 5 cards the player wins</li>
                </ul>
                <div className="modal-label">
                    <label>
                        <b>Player name: &#160;</b>
                        <input type="text" value={playername} onChange={handlePlayernameChange} />
                    </label>
                </div>
            </Modal>}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setUsername: (username) => dispatch(setUsername(username))
});

export default connect(null, mapDispatchToProps)(LoginPage);
