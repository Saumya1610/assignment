import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; 
import Table from "../../Atoms/Table/Table";

const LeaderBoard = () => {
  const [userStats, setUserStats] = useState([]);
  
  // Access username from Redux store
  const username = useSelector(state => state.user.username);
  useEffect(() => {
    // Fetch all stored usernames with stats when the component mounts
    const fetchUserStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/get-all-usernames");
        const data = await response.json();

        if (response.ok) {
          setUserStats(data.players || []);
        } else {
          toast.error(`Error: ${data.error}`);
        }
      } catch (error) {
        toast.error("An error occurred while communicating with the server.");
      }
    };
    fetchUserStats();
  }, []); // Refresh the list when a new username is stored (dependency on 'message')

  return (
    <div className="leaderboard">
      <h2>Welcome, {username}!</h2>
      <h3>Live Stats:</h3>
      <Table className="leaderboard-table" data={userStats} />
    </div>
  );
};

export default LeaderBoard;
