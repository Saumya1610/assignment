import React, { useEffect } from "react";
import "./LeaderBoard.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Atoms/Table/Table";
import { setUserStats } from "../../../actions/leaderboardActions";

const LeaderBoard = () => {
    const dispatch = useDispatch();
    const userStats = useSelector(state => state.leaderboard.userStats);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const response = await fetch("http://localhost:8080/get-all-usernames");
                const data = await response.json();

                if (response.ok) {
                    dispatch(setUserStats(data.players || [])); 
                } else {
                    toast.error(`Error: ${data.error}`);
                }
            } catch (error) {
                toast.error("An error occurred while communicating with the server.");
            }
        };

        fetchUserStats(); // Fetch user stats immediately when the component mounts

        const intervalId = setInterval(fetchUserStats, 5000); // Fetch user stats every 5 seconds

        return () => {
            clearInterval(intervalId); // Clear interval when the component unmounts
        };
    }, [dispatch]); 

    return (
        <div className="leaderboard">
            <h2>Welcome, {username}!</h2>
            <h3>Live Stats:</h3>
            <Table className="leaderboard-table" data={userStats} />
        </div>
    );
};

export default LeaderBoard;
